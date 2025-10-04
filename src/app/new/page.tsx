import { getNewStoryIds, getItems } from '@/lib/hackernews-api';
import type { HNStory } from '@/lib/types';
import StoryList from '@/components/story/story-list';
import StoryListSkeleton from '@/components/story/story-list-skeleton';
import { Suspense } from 'react';
import { Newspaper } from 'lucide-react';

const STORIES_PER_PAGE = 30;

async function NewStories() {
  const storyIds = await getNewStoryIds();
  const newStoryIds = storyIds.slice(0, STORIES_PER_PAGE);
  const stories = (await getItems<HNStory>(newStoryIds)).filter(
    (story): story is HNStory => story !== null
  );

  return <StoryList stories={stories} />;
}

export default function NewStoriesPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="h-7 w-7 text-accent" />
        <h1 className="text-3xl font-bold font-headline">New Stories</h1>
      </div>
      <Suspense fallback={<StoryListSkeleton count={STORIES_PER_PAGE} />}>
        <NewStories />
      </Suspense>
    </div>
  );
}
