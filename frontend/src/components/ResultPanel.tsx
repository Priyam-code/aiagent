import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ResultPanelProps {
  searchResults: string;
  scrapedContent: string;
  report: string;
  feedback: string;
  isComplete: boolean;
}

type Tab = 'report' | 'search' | 'scraped' | 'feedback';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'report', label: 'REPORT.MD', icon: '[R]' },
  { id: 'feedback', label: 'CRITIQUE.MD', icon: '[C]' },
  { id: 'search', label: 'SEARCH_DATA.JSON', icon: '[S]' },
  { id: 'scraped', label: 'SCRAPED_DATA.TXT', icon: '[D]' },
];

export default function ResultPanel({
  searchResults,
  scrapedContent,
  report,
  feedback,
  isComplete,
}: ResultPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('report');

  const hasContent = searchResults || scrapedContent || report || feedback;
  if (!hasContent) return null;

  const getContent = () => {
    switch (activeTab) {
      case 'report':
        return report;
      case 'feedback':
        return feedback;
      case 'search':
        return searchResults;
      case 'scraped':
        return scrapedContent;
      default:
        return '';
    }
  };

  const content = getContent();

  const isTabAvailable = (tab: Tab) => {
    switch (tab) {
      case 'report': return !!report;
      case 'feedback': return !!feedback;
      case 'search': return !!searchResults;
      case 'scraped': return !!scrapedContent;
      default: return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto mt-8"
    >
      {/* Complete banner */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-center justify-between py-2 px-4 border border-[#ffffff] bg-[#ffffff] text-[#000000]">
              <div className="flex items-center gap-3">
                <span className="font-bold">STATUS:</span>
                <span className="font-mono text-sm uppercase">EXECUTION COMPLETE. DATA READY FOR REVIEW.</span>
              </div>
              <span className="font-mono">100%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border border-[#444444] bg-[#000000] overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center border-b border-[#444444] bg-[#111111] overflow-x-auto">
          {tabs.map((tab) => {
            const available = isTabAvailable(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => available && setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 text-label-sm transition-colors whitespace-nowrap border-r border-[#262626] ${
                  activeTab === tab.id
                    ? 'text-[#000000] bg-[#ffffff]'
                    : available
                    ? 'text-[#c6c6c6] hover:bg-[#1a1a1a] cursor-pointer'
                    : 'text-[#444444] cursor-not-allowed'
                }`}
              >
                <span className="font-mono opacity-60">{tab.icon}</span>
                <span>{tab.label}</span>
                {!available && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-[#444444] ml-2"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-h-[600px] overflow-y-auto bg-[#000000]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-10"
            >
              {content ? (
                <div className="prose prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-[#ffffff]
                  prose-h1:text-headline-lg prose-h1:uppercase prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-[#262626]
                  prose-h2:text-headline-md prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-[#ffffff]
                  prose-h3:text-body-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#c6c6c6] prose-h3:uppercase
                  prose-p:text-body-md prose-p:text-[#c6c6c6] prose-p:leading-relaxed
                  prose-strong:text-[#ffffff] prose-strong:font-bold
                  prose-em:text-[#c6c6c6] prose-em:italic
                  prose-a:text-[#ffffff] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#c6c6c6]
                  prose-code:text-[#ffffff] prose-code:bg-[#111111] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-[#262626]
                  prose-blockquote:border-l-2 prose-blockquote:border-[#ffffff] prose-blockquote:bg-[#111111] prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-[#c6c6c6]
                  prose-ul:text-[#c6c6c6] prose-ol:text-[#c6c6c6]
                  prose-li:text-[#c6c6c6] prose-li:marker:text-[#888888]
                  prose-table:text-sm
                  prose-th:text-label-sm prose-th:text-[#ffffff] prose-th:bg-[#111111] prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-[#444444]
                  prose-td:text-[#c6c6c6] prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-[#262626]
                  prose-hr:border-[#444444] prose-hr:my-10
                ">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-[#444444]">
                  <motion.div
                    className="w-10 h-10 border-2 border-[#444444] border-t-[#ffffff] mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <p className="text-label-sm tracking-widest uppercase">PROCESSING DATA_STREAM...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
