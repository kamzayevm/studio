import type { HNStory } from '@/lib/types';
import StoryListItem from './story-list-item';

export default function StoryList({ stories }: { stories: HNStory[] }) {
  return (
    <ol className="space-y-2">
      {stories.map((story, index) => (
        story && <StoryListItem key={story.id} story={story} index={index + 1} />
      ))}
    </ol>
  );
}
