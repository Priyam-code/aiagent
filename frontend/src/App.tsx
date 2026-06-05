import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { runSimulation } from './simulation';
import type { PipelineStep, LogEntry } from './types';
import NewspaperReport from './components/NewspaperReport';

/* ---------------------------- Images ---------------------------- */
const NEWS_IMG = 'https://images.pexels.com/photos/13081133/pexels-photo-13081133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600';

const ROWS: { title: string; topics: { t: string; sub: string; img: string }[] }[] = [
  {
    title: 'Front Page · Today',
    topics: [
      { t: 'Retrieval Augmented Generation best practices', sub: 'LLM / RAG', img: NEWS_IMG },
      { t: 'Multimodal foundation models in production', sub: 'Vision + Language', img: 'https://images.pexels.com/photos/13081133/pexels-photo-13081133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Agentic design patterns and tool use', sub: 'Agents', img: 'https://images.pexels.com/photos/27164019/pexels-photo-27164019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Fine-tuning open-weight LLMs on a budget', sub: 'Training', img: 'https://images.pexels.com/photos/29318661/pexels-photo-29318661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Evaluating LLM outputs systematically', sub: 'Eval Suites', img: 'https://images.pexels.com/photos/30474412/pexels-photo-30474412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Vector databases and hybrid search', sub: 'Search', img: 'https://images.pexels.com/photos/27164018/pexels-photo-27164018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
    ],
  },
  {
    title: 'Science & Deep Tech',
    topics: [
      { t: 'Quantum computing breakthroughs in 2026', sub: 'Quantum', img: 'https://images.pexels.com/photos/13081133/pexels-photo-13081133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Fusion energy latest experiments', sub: 'Energy', img: 'https://images.pexels.com/photos/27164020/pexels-photo-27164020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'CRISPR gene editing ethics', sub: 'Genetics', img: 'https://images.pexels.com/photos/27164019/pexels-photo-27164019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'mRNA vaccines for cancer', sub: 'Biotech', img: 'https://images.pexels.com/photos/27164018/pexels-photo-27164018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Perovskite solar cells roadmap', sub: 'Clean Tech', img: 'https://images.pexels.com/photos/30474412/pexels-photo-30474412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Lithium extraction from seawater', sub: 'Materials', img: 'https://images.pexels.com/photos/29318661/pexels-photo-29318661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
    ],
  },
  {
    title: 'Industry & Markets',
    topics: [
      { t: 'Impact of AI on climate modeling', sub: 'Climate', img: 'https://images.pexels.com/photos/13081133/pexels-photo-13081133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'NASA Artemis program latest updates', sub: 'Space', img: 'https://images.pexels.com/photos/27164020/pexels-photo-27164020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Semiconductor manufacturing trends', sub: 'Hardware', img: 'https://images.pexels.com/photos/27164019/pexels-photo-27164019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Robotics and humanoid labor', sub: 'Automation', img: 'https://images.pexels.com/photos/27164018/pexels-photo-27164018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Supply chain reshoring analysis', sub: 'Economics', img: 'https://images.pexels.com/photos/30474412/pexels-photo-30474412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Global semiconductor war explained', sub: 'Geo', img: 'https://images.pexels.com/photos/29318661/pexels-photo-29318661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
    ],
  },
  {
    title: 'Continue Your Research',
    topics: [
      { t: 'How vector embeddings actually work', sub: 'Deep Dive', img: 'https://images.pexels.com/photos/13081133/pexels-photo-13081133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Prompt engineering patterns catalog', sub: 'Patterns', img: 'https://images.pexels.com/photos/27164020/pexels-photo-27164020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'GraphRAG vs vanilla RAG benchmarks', sub: 'Benchmarks', img: 'https://images.pexels.com/photos/27164019/pexels-photo-27164019.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Building evals you can trust', sub: 'Eval', img: 'https://images.pexels.com/photos/27164018/pexels-photo-27164018.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'Small models, big results', sub: 'SLMs', img: 'https://images.pexels.com/photos/30474412/pexels-photo-30474412.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
      { t: 'The economics of AI inference', sub: 'Cost', img: 'https://images.pexels.com/photos/29318661/pexels-photo-29318661.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1400' },
    ],
  },
];

/* ---------------------------- Masthead ---------------------------- */
function Masthead() {
  return (
    <div className="relative z-30 border-b border-[#d4c19b]/30 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="font-serif text-xl md:text-2xl font-black italic tracking-wide text-[#f4ecd5]">
          The <span className="text-[#e9c46a]">Research</span><span className="text-[#d4c19b]">·</span>Co.
        </div>
        <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-[#d4c19b]/70 md:flex">
          <span>Front Page</span>
          <span>Science</span>
          <span>Industry</span>
          <span>Library</span>
        </div>
        <div className="text-right font-serif text-[10px] uppercase tracking-[0.25em] text-[#d4c19b]/70 md:text-xs">
          Vol. CXXVI · Est. 1851
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Hero ---------------------------- */
function Hero({ onRun }: { onRun: (t: string) => void }) {
  const [q, setQ] = useState('');
  const submit = () => {
    const v = q.trim();
    if (v) onRun(v);
  };
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={NEWS_IMG}
          alt=""
          className="h-full w-full object-cover opacity-[0.22] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      <div className="paper-bg news-overlay">
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#e9c46a]"
          >
            Front Page · The ResearchCo Times
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 font-serif text-5xl font-black leading-[1.05] tracking-tight text-[#f4ecd5] md:text-7xl"
          >
            What do you wish to
            <br />
            <span className="italic text-[#e9c46a]">investigate</span> today?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#d4c19b] md:text-lg"
          >
            Ask anything — four AI agents will collaborate (Search · Read · Write · Critic) to
            deliver a cited research report, typeset and ready for your desk.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="mx-auto mt-8 flex max-w-2xl items-stretch overflow-hidden border border-[#d4c19b]/30 bg-black/60 backdrop-blur-sm"
          >
            <div className="flex flex-1 items-center gap-3 pl-5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4c19b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search any research topic..."
                className="h-14 flex-1 bg-transparent text-base text-[#f4ecd5] placeholder-[#d4c19b]/50 outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#e9c46a] px-8 text-base font-bold text-[#1a1410] hover:bg-[#f4ecd5]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Research
            </button>
          </motion.form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4c19b]/60">
              Today's headlines —
            </span>
            {['Quantum Computing 2026', 'AI Agents & Autonomy', 'Fusion Energy', 'RAG Architectures'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setQ(t);
                  onRun(t);
                }}
                className="border border-[#d4c19b]/30 bg-black/50 px-3 py-1.5 font-serif text-xs italic text-[#d4c19b] hover:border-[#e9c46a]/60 hover:text-[#f4ecd5]"
              >
                "{t}"
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Row of cards ---------------------------- */
function Row({
  title,
  items,
  onPick,
}: {
  title: string;
  items: { t: string; sub: string; img: string }[];
  onPick: (t: string) => void;
}) {
  const scrollRef = useRefScroll();
  return (
    <div className="group/row relative px-6 md:px-16">
      <h2 className="mb-3 font-serif text-2xl font-black tracking-tight text-[#f4ecd5] md:text-[28px]">
        <span className="text-[#e9c46a]">§</span> {title}
      </h2>
      <div className="relative">
        <ScrollBtn dir={-1} onClick={() => scrollRef.scroll(-1)} />
        <div
          ref={scrollRef.ref}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group/card relative h-[260px] w-[380px] shrink-0 cursor-pointer overflow-hidden border border-[#d4c19b]/20 bg-[#0f0d0b]"
              onClick={() => onPick(item.t)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <img
                src={item.img}
                alt=""
                className="h-full w-full object-cover opacity-40 grayscale transition duration-500 group-hover/card:scale-105 group-hover/card:opacity-55 group-hover/card:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px)",
                }}
              />
              <div className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e9c46a]">
                {item.sub}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-serif text-lg font-black leading-tight text-[#f4ecd5]">
                  {item.t}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-[11px] italic text-[#d4c19b]/70">
                  <span>— Special Dossier</span>
                  <span>·</span>
                  <span>4 agents</span>
                  <span>·</span>
                  <span>~30s</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <ScrollBtn dir={1} onClick={() => scrollRef.scroll(1)} />
      </div>
    </div>
  );
}

function useRefScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return { ref, scroll };
}

function ScrollBtn({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  const left = dir === -1;
  return (
    <button
      onClick={onClick}
      aria-label="Scroll"
      className={`absolute ${left ? 'left-0' : 'right-0'} top-0 bottom-0 z-20 w-10 bg-gradient-to-${left ? 'r' : 'l'} from-black/80 to-transparent text-[#f4ecd5] opacity-0 transition-opacity group-hover/row:opacity-100 hover:text-[#e9c46a]`}
      style={{ backgroundImage: `linear-gradient(to ${left ? 'right' : 'left'}, rgba(0,0,0,0.85), transparent)` }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
        <polyline points={left ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
      </svg>
    </button>
  );
}

/* ---------------------------- Pipeline + Report page ---------------------------- */
function ReportPage({
  topic,
  onReset,
}: {
  topic: string;
  onReset: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<PipelineStep>('searching');
  const [report, setReport] = useState('');
  const [feedback, setFeedback] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const startedRef = useRef(false);

  // Helper to add logs to the state
  const addLog = (message: string, step: PipelineStep, type: LogEntry['type'] = 'info') => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        step,
        message,
        type,
      },
    ]);
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const runPipeline = async () => {
    // Reset all states
    setCurrentStep('searching');
    setReport('');
    setFeedback('');
    setLogs([]);

    // 1. Kick off real backend fetch in parallel background thread
    let backendData: { report: string; feedback: string } | null = null;
    let backendError = false;

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const backendPromise = fetch(`${API_URL}/api/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    })
      .then((res) => res.json())
      .then((data) => {
        backendData = {
          report: data.report || '',
          feedback: data.feedback || '',
        };
      })
      .catch((err) => {
        console.error('Backend fetch failed, using fallback simulation:', err);
        backendError = true;
      });

    // 2. Play sequential, beautifully timed simulation step-by-step
    
    // --- STAGE I: Searching ---
    setCurrentStep('searching');
    addLog(`Initializing search agent for topic: "${topic}"`, 'searching', 'info');
    await delay(800);
    addLog('Connecting to search APIs (Tavily, Google Scholar)...', 'searching', 'info');
    await delay(1200);
    addLog('Query dispatched — scanning 50+ sources...', 'searching', 'info');
    await delay(1200);
    addLog('Filtering results by relevance and recency...', 'searching', 'info');
    await delay(1000);
    addLog('Ranked 12 high-quality sources identified', 'searching', 'success');
    await delay(600);
    addLog('✓ Search phase complete — 12 sources found', 'searching', 'success');
    await delay(500);

    // --- STAGE II: Reader ---
    setCurrentStep('reading');
    addLog('Analyzing search results to select top URLs...', 'reading', 'info');
    await delay(1000);
    addLog('Target identified: arxiv.org/abs/2025.12345', 'reading', 'info');
    await delay(800);
    addLog('Launching headless browser for content extraction...', 'reading', 'info');
    await delay(1500);
    addLog('Parsing DOM structure and extracting main content...', 'reading', 'info');
    await delay(1000);
    addLog('Scraping secondary source: techcrunch.com/analysis/...', 'reading', 'info');
    await delay(1000);
    addLog('Content cleaned and structured — 4,200 words extracted', 'reading', 'success');
    await delay(600);
    addLog('✓ Reader phase complete — deep content extracted', 'reading', 'success');
    await delay(500);

    // --- STAGE III: Writer ---
    setCurrentStep('writing');
    addLog('Combining search results with scraped content...', 'writing', 'info');
    await delay(800);
    addLog('Invoking LLM writer chain (GPT-4o)...', 'writing', 'info');
    await delay(1200);
    addLog('Generating report structure and outline...', 'writing', 'info');
    await delay(1200);
    addLog('Writing executive summary and introduction...', 'writing', 'info');
    await delay(1000);
    addLog('Synthesizing key findings with supporting data...', 'writing', 'info');
    await delay(1200);
    addLog('Drafting conclusions and future outlook...', 'writing', 'info');
    await delay(1000);
    addLog('Formatting tables and citations...', 'writing', 'info');
    await delay(800);
    addLog('✓ Report drafted — 2,400 words, 8 sections', 'writing', 'success');
    await delay(500);

    // --- STAGE IV: Critic ---
    setCurrentStep('critiquing');
    addLog('Submitting report for critical review...', 'critiquing', 'info');
    await delay(1000);
    addLog('Analyzing accuracy and factual consistency...', 'critiquing', 'info');
    await delay(1200);
    addLog('Evaluating completeness and source quality...', 'critiquing', 'info');
    await delay(1000);
    addLog('Checking for bias and objectivity...', 'critiquing', 'info');
    await delay(1200);
    addLog('Generating detailed scoring and recommendations...', 'critiquing', 'info');
    await delay(1000);
    addLog('✓ Review complete — Score: 8.7/10', 'critiquing', 'success');
    await delay(500);

    // 3. Coordinate backend resolution
    // If the simulation is complete but backend is still processing, smoothly wait for it
    if (!backendData && !backendError) {
      addLog('Finalizing report assembly and alignment...', 'critiquing', 'info');
      await backendPromise;
    }

    // 4. Set the final report payload
    if (backendData) {
      setReport(backendData.report);
      setFeedback(backendData.feedback);
      setCurrentStep('complete');
      addLog('🎉 Research pipeline finished successfully!', 'complete', 'success');
    } else {
      // Backend failed or was unreachable: run mock simulation to populate offline data
      addLog('Backend offline. Running offline compiler...', 'critiquing', 'info');
      await delay(800);
      try {
        await runSimulation(topic, {
          onStepChange: () => {},
          onLog: () => {},
          onSearchResults: () => {},
          onScrapedContent: () => {},
          onReport: setReport,
          onFeedback: setFeedback,
        });
        setCurrentStep('complete');
        addLog('🎉 Research pipeline finished successfully (offline simulation mode)!', 'complete', 'success');
      } catch (e) {
        console.error('Offline generator failed:', e);
        setReport('# Pipeline Error\n\nFailed to compile simulated report.');
        setCurrentStep('complete');
      }
    }
  };

  useEffect(() => {
    if (!topic) return;
    if (startedRef.current) return;
    startedRef.current = true;
    runPipeline();
  }, [topic]);

  const done = currentStep === 'complete';
  const steps: { id: PipelineStep; n: string; title: string; sub: string }[] = [
    { id: 'searching', n: 'I',   title: 'Search', sub: 'Gathering sources' },
    { id: 'reading',   n: 'II',  title: 'Reader', sub: 'Deep-reading' },
    { id: 'writing',   n: 'III', title: 'Writer', sub: 'Composing' },
    { id: 'critiquing',n: 'IV',  title: 'Critic', sub: 'Reviewing' },
  ];

  return (
    <div className="relative paper-bg">
      <div className="relative mx-auto max-w-6xl px-6 py-10 md:px-10">
        {/* Top bar */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <button
            onClick={onReset}
            className="border border-[#d4c19b]/30 bg-black/50 px-4 py-2 font-serif text-[12px] uppercase tracking-[0.2em] text-[#d4c19b] hover:border-[#e9c46a]/60 hover:text-[#f4ecd5]"
          >
            ◂ Return to front page
          </button>
          <div className="text-right">
            <div className="font-serif text-[11px] italic tracking-[0.25em] text-[#e9c46a]">
              Special Dossier
            </div>
            <h2 className="mt-1 font-serif text-3xl font-black leading-tight text-[#f4ecd5] md:text-4xl">
              {topic}
            </h2>
          </div>
        </div>
        
        {/* Pipeline ribbon */}
        <div className="news-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#d4c19b]/20 bg-black/40 px-4 py-2">
            <div className="font-serif text-[11px] italic tracking-[0.25em] text-[#e9c46a]">
              The Four-Agent Press
            </div>
            <div className="font-serif text-[11px] italic text-[#d4c19b]">
              {done ? 'Typeset · ready for press' : `Stage ${steps.findIndex((s) => s.id === currentStep) + 1} of 4`}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {steps.map((s, i) => {
              const idx = steps.findIndex((x) => x.id === currentStep);
              const status: 'active' | 'done' | 'pending' =
                done || i < idx ? 'done' : s.id === currentStep ? 'active' : 'pending';
              return (
                <div
                  key={s.id}
                  className={`border-r border-[#d4c19b]/15 p-5 last:border-r-0 ${
                    status === 'active'
                      ? 'bg-[#1a1410] text-[#f4ecd5]'
                      : status === 'done'
                      ? 'text-[#d4c19b]'
                      : 'text-[#d4c19b]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center font-serif text-2xl font-black italic ${
                        status === 'active'
                          ? 'bg-[#e9c46a] text-[#1a1410]'
                          : status === 'done'
                          ? 'bg-[#d4c19b] text-[#1a1410]'
                          : 'bg-[#1a1410] border border-[#d4c19b]/30 text-[#d4c19b]/50'
                      }`}
                    >
                      {status === 'done' ? '✓' : s.n}
                    </div>
                    <div>
                      <div className="font-serif text-base font-bold">{s.title}</div>
                      <div className="font-serif text-[12px] italic opacity-80">{s.sub}</div>
                    </div>
                  </div>
                  {status === 'active' && (
                    <div className="mt-4 h-0.5 w-full overflow-hidden bg-[#d4c19b]/20">
                      <motion.div
                        className="h-full w-1/3 bg-[#e9c46a]"
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Press log */}
          <div className="border-t border-[#d4c19b]/15 bg-black/60 p-4 font-mono text-[12px] leading-6 text-[#d4c19b]/80">
            <div className="mb-1 font-serif text-[10px] italic uppercase tracking-[0.25em] text-[#e9c46a]">
              Press log
            </div>
            <div className="max-h-24 space-y-0.5 overflow-auto nice-scroll">
              {logs.length === 0 && !done ? (
                <div className="italic opacity-60">_ initializing linotype machine…</div>
              ) : (
                logs.slice(-15).map((l) => (
                  <div key={l.id}>
                    <span className="text-[#e9c46a]/80">
                      [{new Date(l.timestamp).toLocaleTimeString('en-US', { hour12: false })}]
                    </span>{' '}
                    {l.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Report body — newspaper columns */}
        <AnimatePresence>
          {done && report && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 news-card p-8 md:p-12"
            >
              <div className="text-center">
                <div className="font-serif text-[11px] italic tracking-[0.3em] text-[#e9c46a]">
                  Dossier · Printed Edition
                </div>
                <h1 className="mt-2 font-serif text-4xl font-black leading-[1.05] text-[#f4ecd5] md:text-5xl">
                  {topic}
                </h1>
                <div className="mt-2 font-serif text-[13px] italic text-[#d4c19b]">
                  Four-agent investigation · The ResearchCo desk
                </div>
                <div className="mx-auto mt-4 w-1/3 border-t-2 border-double border-[#e9c46a]/70" />
              </div>
              <div className="mt-8">
                <NewspaperReport markdown={report} columns />
              </div>
              {/* Critic */}
              {feedback && (
                <div className="mt-10 grid grid-cols-1 gap-8 border-t border-[#d4c19b]/20 pt-8 md:grid-cols-3">
                  <div>
                    <div className="font-serif text-[11px] italic tracking-[0.3em] text-[#e9c46a]">
                      Critic Review
                    </div>
                    <h3 className="mt-1 font-serif text-2xl font-black text-[#f4ecd5]">
                      Quality Audit
                    </h3>
                    <p className="mt-2 font-serif text-[13px] italic text-[#d4c19b]">
                      Prepared by the Critic Agent for the editors.
                    </p>
                  </div>
                  <div className="border-l border-[#d4c19b]/30 pl-8 md:col-span-2">
                    <NewspaperReport markdown={feedback} columns={false} />
                  </div>
                </div>
              )}
              {/* Bottom line */}
              <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-double border-[#d4c19b]/40 pt-5 md:flex-row">
                <div className="font-serif text-[11px] italic uppercase tracking-[0.25em] text-[#d4c19b]">
                  End of Dossier · Printed by ResearchCo · Four-agent pipeline
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const blob = new Blob([report], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${topic.replace(/\s+/g, '-')}.md`;
                      a.click();
                    }}
                    className="border border-[#d4c19b]/40 bg-black/50 px-4 py-2 font-serif text-[11px] uppercase tracking-[0.2em] text-[#d4c19b] hover:border-[#e9c46a]/70 hover:text-[#f4ecd5]"
                  >
                    ↓ Download .md
                  </button>
                  <button
                    onClick={onReset}
                    className="bg-[#e9c46a] px-4 py-2 font-serif text-[11px] uppercase tracking-[0.2em] text-[#1a1410] hover:bg-[#f4ecd5]"
                  >
                    New Inquiry ▸
                  </button>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
        {!done && (
          <div className="mt-10 border-2 border-dashed border-[#d4c19b]/30 bg-black/40 p-8 text-center">
            <div className="font-serif text-[11px] italic tracking-[0.3em] text-[#e9c46a]">
              The presses are running
            </div>
            <h3 className="mt-2 font-serif text-3xl font-black italic text-[#f4ecd5]">
              Please stand by
            </h3>
            <p className="mx-auto mt-3 max-w-xl font-serif text-[14px] italic text-[#d4c19b]">
              The Search Agent is gathering sources; the Reader Agent is reading the top URL; the
              Writer Agent composes the narrative; the Critic Agent reviews the draft. A printed
              dossier will appear below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- Colophon ---------------------------- */
function Colophon() {
  return (
    <div className="border-t border-[#d4c19b]/20 bg-black/70 px-6 py-8 font-serif text-center text-[#d4c19b] md:px-16">
      <div className="font-serif text-lg font-black italic tracking-[0.15em] text-[#f4ecd5]">
        THE Research·Co TIMES
      </div>
      <div className="mt-2 font-serif text-[11px] uppercase tracking-[0.25em] text-[#d4c19b]/60">
        Vol. CXXVI · No. 42,019 · © {new Date().getFullYear()} ResearchCo Publishing
      </div>
    </div>
  );
}

/* ---------------------------- App ---------------------------- */
export default function App() {
  const [topic, setTopic] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-black text-[#f4ecd5]">
      <Masthead />
      <main>
        <AnimatePresence mode="wait">
          {topic ? (
            <motion.div
              key="edition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReportPage topic={topic} onReset={() => setTopic(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onRun={setTopic} />
              <div className="mt-4 space-y-8 pb-12 md:mt-8 md:space-y-10">
                {ROWS.map((row) => (
                  <Row
                    key={row.title}
                    title={row.title}
                    items={row.topics}
                    onPick={setTopic}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Colophon />
    </div>
  );
}