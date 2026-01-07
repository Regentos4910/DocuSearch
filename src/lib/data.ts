export type Document = {
  id: string;
  name: string;
  status: 'Processed' | 'Processing' | 'Error';
  createdAt: string;
  size: string;
};

export const documents: Document[] = [
  { id: 'doc-1', name: 'Q3_2023_Financial_Report.pdf', status: 'Processed', createdAt: '2023-10-15', size: '2.5 MB' },
  { id: 'doc-2', name: 'Employee_Handbook_v12.pdf', status: 'Processed', createdAt: '2023-09-28', size: '1.2 MB' },
  { id: 'doc-3', name: 'Project_Phoenix_Proposal.pdf', status: 'Processing', createdAt: '2023-10-18', size: '5.1 MB' },
  { id: 'doc-4', name: 'Marketing_Strategy_2024.pdf', status: 'Processed', createdAt: '2023-08-05', size: '3.8 MB' },
  { id: 'doc-5', name: 'Technical_Manual_XR-7.pdf', status: 'Error', createdAt: '2023-10-17', size: '10.2 MB' },
  { id: 'doc-6', name: 'Onboarding_Presentation.pdf', status: 'Processed', createdAt: '2023-07-21', size: '8.4 MB' },
];

export type SearchResult = {
  id: string;
  type: 'text' | 'table' | 'image';
  content: string;
  documentName: string;
  page: number;
  relevance: number;
  image_url?: string;
  data_ai_hint?: string;
};

export const searchResults: SearchResult[] = [
  {
    id: 'res-1',
    type: 'text',
    content: '...the projected revenue for Q4 is expected to exceed initial forecasts by approximately 15%, driven by strong performance in the North American market...',
    documentName: 'Q3_2023_Financial_Report.pdf',
    page: 5,
    relevance: 0.95,
  },
  {
    id: 'res-2',
    type: 'table',
    content: 'Quarterly sales data showing revenue, costs, and profit margin for each product line. Product A saw a 20% increase in sales.',
    documentName: 'Q3_2023_Financial_Report.pdf',
    page: 8,
    relevance: 0.91,
  },
  {
    id: 'res-3',
    type: 'image',
    content: 'A bar chart illustrating the year-over-year growth in different market segments.',
    documentName: 'Marketing_Strategy_2024.pdf',
    page: 12,
    relevance: 0.88,
    image_url: 'https://picsum.photos/seed/chart1/600/400',
    data_ai_hint: 'bar chart'
  },
  {
    id: 'res-4',
    type: 'text',
    content: '...company policy regarding remote work states that employees must have a dedicated and ergonomic workspace. Requests for equipment can be submitted via the internal portal...',
    documentName: 'Employee_Handbook_v12.pdf',
    page: 23,
    relevance: 0.85,
  },
  {
    id: 'res-5',
    type: 'text',
    content: '...the key deliverables for Phase 1 include the initial prototype and user feedback report. The deadline for completion is November 30th...',
    documentName: 'Project_Phoenix_Proposal.pdf',
    page: 3,
    relevance: 0.82,
  },
  {
    id: 'res-6',
    type: 'image',
    content: 'A pie chart illustrating the current market share distribution among key competitors.',
    documentName: 'Marketing_Strategy_2024.pdf',
    page: 7,
    relevance: 0.79,
    image_url: 'https://picsum.photos/seed/chart2/600/400',
    data_ai_hint: 'pie chart'
  },
];
