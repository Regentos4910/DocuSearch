import { FileSearch } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <FileSearch className="h-8 w-8 text-sidebar-foreground" />
      <span className="text-xl font-bold font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        DocuSearch
      </span>
    </div>
  );
}
