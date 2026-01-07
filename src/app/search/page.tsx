'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Image as ImageIcon, Search as SearchIcon, Table, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { searchResults, SearchResult } from '@/lib/data';
import { Separator } from '@/components/ui/separator';

const getIcon = (type: SearchResult['type']) => {
  switch (type) {
    case 'text':
      return <FileText className="h-5 w-5 text-muted-foreground" />;
    case 'table':
      return <Table className="h-5 w-5 text-muted-foreground" />;
    case 'image':
      return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | SearchResult['type']>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setResults(searchResults);
      setLoading(false);
    }, 1000);
  };

  const filteredResults = results.filter(
    (result) => activeFilter === 'all' || result.type === activeFilter
  );

  return (
    <div className="space-y-8">
      <div className="relative">
        <h1 className="text-3xl font-bold font-headline mb-2">Search Knowledge Base</h1>
        <p className="text-muted-foreground">Find information across all your processed documents.</p>
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by keyword, topic, or ask a question..."
              className="pl-10 h-12 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" className="h-12" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
          </Button>
        </form>
      </div>
      
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold font-headline">Results</h2>
              <Badge variant="secondary">{filteredResults.length} found</Badge>
            </div>
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {(['all', 'text', 'table', 'image'] as const).map(filter => (
                    <Button 
                        key={filter} 
                        variant={activeFilter === filter ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className={`capitalize transition-colors duration-200 ${activeFilter === filter ? 'shadow-sm' : ''}`}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getIcon(result.type)}
                        <CardTitle className="text-lg">{result.documentName}</CardTitle>
                      </div>
                      <Badge variant="outline">Page {result.page}</Badge>
                    </div>
                    <Badge variant="secondary" className="whitespace-nowrap">
                      Relevance: {(result.relevance * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">{result.content}</p>
                  {result.type === 'image' && result.image_url && (
                    <div className="overflow-hidden rounded-md border">
                        <Image
                            src={result.image_url}
                            alt={result.content}
                            width={600}
                            height={400}
                            className="object-cover"
                            data-ai-hint={result.data_ai_hint}
                        />
                    </div>
                  )}
                </CardContent>
                <Separator />
                <CardFooter className="py-3 px-6 flex justify-end items-center gap-2 bg-muted/50">
                    <span className="text-sm text-muted-foreground mr-auto">Was this result helpful?</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4"/>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
