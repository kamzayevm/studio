'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { suggestRelevantSources, type SuggestRelevantSourcesOutput } from '@/ai/flows/suggest-relevant-sources';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AISourcesProps {
  storyTitle: string;
  comments: string[];
}

export default function AISources({ storyTitle, comments }: AISourcesProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestRelevantSourcesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestSources = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const output = await suggestRelevantSources({ storyTitle, comments });
      setResult(output);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 border-primary/20 border-dashed">
      <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-accent" />
            AI-Powered Research Assistant
          </CardTitle>
          <CardDescription>
            Analyze the comments and suggest other relevant articles to read.
          </CardDescription>
      </CardHeader>
      <CardContent>
        {!result && !loading && (
          <Button onClick={handleSuggestSources} disabled={loading || comments.length === 0}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suggesting...
              </>
            ) : (
               <>
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Relevant Sources
               </>
            )}
          </Button>
        )}
        
        {comments.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground mt-2">No comments to analyze yet.</p>
        )}

        {loading && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Analyzing comments and searching for sources...</div>}
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div>
            <h3 className="font-semibold mb-2 font-headline">Suggested Sources:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {result.relevantSources.map((source, index) => (
                <li key={index}>
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
             <Button variant="ghost" onClick={handleSuggestSources} disabled={loading} className="mt-4">
                <Sparkles className="mr-2 h-4 w-4" />
                Regenerate
             </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
