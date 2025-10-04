import { getItem, getCommentsWithChildren } from '@/lib/hackernews-api';
import type { HNStory, HNComment } from '@/lib/types';
import { notFound } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, MessageCircle, Clock, User, Award } from 'lucide-react';
import Comment from '@/components/story/comment';
import AISources from '@/components/story/ai-sources';

function getHost(url: string | undefined) {
  if (!url) return '';
  try {
    const host = new URL(url).host;
    return host.startsWith('www.') ? host.substring(4) : host;
  } catch (e) {
    return '';
  }
}

function extractCommentText(comments: HNComment[]): string[] {
    let texts: string[] = [];
    if (!comments) return texts;

    for (const comment of comments) {
        if (comment.text) {
            const cleanText = comment.text.replace(/<[^>]*>?/gm, ' ');
            if (cleanText.trim()) texts.push(cleanText.trim());
        }
        if (comment.children && comment.children.length > 0) {
            texts = texts.concat(extractCommentText(comment.children));
        }
    }
    return texts;
}

export default async function ItemPage({ params }: { params: { id: string } }) {
  const storyId = parseInt(params.id, 10);
  if (isNaN(storyId)) {
    notFound();
  }

  const story = await getItem<HNStory>(storyId);

  if (!story || story.type !== 'story') {
    notFound();
  }

  const comments = story.kids ? await getCommentsWithChildren(story.kids) : [];
  const commentTexts = extractCommentText(comments);
  const host = getHost(story.url);

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="mb-8 rounded-lg border bg-card text-card-foreground p-6">
        <h1 className="text-3xl font-bold mb-2 font-headline">{story.title}</h1>
        {host && (
          <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm"
          >
            {host} <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-4">
           <span className="flex items-center gap-1.5">
            <Award className="h-4 w-4" /> {story.score || 0} points
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {story.by}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {story.time ? formatDistanceToNow(new Date(story.time * 1000), { addSuffix: true }) : 'N/A'}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" /> {story.descendants || 0} comments
          </span>
        </div>
      </div>
      
      <div className="my-8">
        <AISources storyTitle={story.title ?? ''} comments={commentTexts} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 font-headline">Comments</h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          ) : (
            <p className="text-muted-foreground">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
