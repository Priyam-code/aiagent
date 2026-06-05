export type PipelineStep = 'idle' | 'searching' | 'reading' | 'writing' | 'critiquing' | 'complete';

export interface StepConfig {
  id: PipelineStep;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface PipelineState {
  currentStep: PipelineStep;
  topic: string;
  searchResults: string;
  scrapedContent: string;
  report: string;
  feedback: string;
  logs: LogEntry[];
  startTime: number | null;
  endTime: number | null;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  step: PipelineStep;
  message: string;
  type: 'info' | 'success' | 'warning' | 'data';
}

export const STEPS: StepConfig[] = [
  {
    id: 'searching',
    label: 'Search Agent',
    description: 'Finding recent, reliable & detailed information',
    icon: '🔍',
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'reading',
    label: 'Reader Agent',
    description: 'Scraping top resources for deeper content',
    icon: '📖',
    color: 'text-emerald-400',
    bgColor: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'writing',
    label: 'Writer Agent',
    description: 'Drafting comprehensive research report',
    icon: '✍️',
    color: 'text-amber-400',
    bgColor: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'critiquing',
    label: 'Critic Agent',
    description: 'Reviewing and providing feedback',
    icon: '🧐',
    color: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-pink-500/20',
  },
];
