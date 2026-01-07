import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { documents } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your knowledge base.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Process New Document</CardTitle>
          <CardDescription>Upload a PDF to add it to your searchable knowledge base.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg border-muted-foreground/30 hover:border-primary transition-colors cursor-pointer bg-muted/20 hover:bg-muted/50">
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Drag & drop your files here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <Button variant="outline" className="mt-2">
              Browse Files
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">Supports PDF files (including scanned documents with OCR)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recently Processed Documents</CardTitle>
          <CardDescription>An overview of your most recently processed documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Size</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.slice(0, 5).map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge variant={doc.status === 'Processed' ? 'default' : doc.status === 'Processing' ? 'secondary' : 'destructive'} 
                           className={doc.status === 'Processed' ? 'bg-green-600' : ''}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.createdAt}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
