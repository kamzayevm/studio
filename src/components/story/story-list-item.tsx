import type { HNStory } from '@/lib/types';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { MessageCircle, Clock, User, Award, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function getHost(url: string | undefined) {
  if (!url) return '';
  try {
    const host = new URL(url).host;
    return host.startsWith('www.') ? host.substring(4) : host;
  } catch (e) {
    return '';
  }
}

export default function StoryListItem({ story, index }: { story: HNStory; index: number }) {
  const host = getHost(story.url);

  return (
    <Card as="li" className="p-4 transition-all hover:bg-card/90">
      <div className="flex gap-4">
        <div className="text-xl text-muted-foreground font-semibold w-8 text-center pt-1">{index}.</div>
        <div className="flex-1">
          <div className="flex items-start gap-2">
             <a
              href={story.url || `/item/${story.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline text-lg font-semibold leading-tight hover:underline"
            >
              {story.title}
             </a>
            {host && 
              <span className="text-sm text-muted-foreground flex-shrink-0">
                (<a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{host}</a>)
              </span>
            }
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
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
            <Link href={`/item/${story.id}`} className="flex items-center gap-1.5 hover:text-primary">
              <MessageCircle className="h-4 w-4" /> {story.descendants || 0} comments
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
