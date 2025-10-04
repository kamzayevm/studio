import type { HNComment } from '@/lib/types';
import { User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '../ui/separator';

export default function Comment({ comment }: { comment: HNComment }) {
  return (
    <div className="flex flex-col">
      <div className="text-xs text-muted-foreground flex items-center gap-2 mb-2">
        <User className="h-3 w-3" />
        <span className="font-medium">{comment.by}</span>
        <span className="text-muted-foreground/50">|</span>
        <Clock className="h-3 w-3" />
        <span>{comment.time ? formatDistanceToNow(new Date(comment.time * 1000), { addSuffix: true }) : 'N/A'}</span>
      </div>
      <div
        className="prose prose-sm dark:prose-invert max-w-none space-y-4 [&_a]:text-primary [&_a:hover]:underline"
        dangerouslySetInnerHTML={{ __html: comment.text || '' }}
      />
      
      {comment.children && comment.children.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-border/80 space-y-6">
          {comment.children.map((child) => (
            <Comment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
}
