import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isRunning: boolean;
}

const SUGGESTIONS = [
  'Quantum Computing in 2026',
  'Latest breakthroughs in nuclear fusion energy',
  'AI agents and autonomous systems',
  'CRISPR gene therapy clinical trials',
  'Space commercialization trends',
  'Brain-computer interfaces progress',
];

export default function TopicInput({ onSubmit, isRunning }: TopicInputProps) {
  const [topic, setTopic] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isRunning) {
      inputRef.current?.focus();
    }
  }, [isRunning]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isRunning) {
      onSubmit(topic.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
    if (!isRunning) {
      onSubmit(suggestion);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="text-label-sm text-[#c6c6c6] tracking-[0.1em]">
          TARGET IDENTIFIER
        </label>
        <div className="flex items-end gap-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="INPUT PARAMETERS..."
              disabled={isRunning}
              className={`w-full bg-transparent text-body-lg text-[#ffffff] placeholder-[#444444] outline-none pb-2 transition-colors duration-200 border-b ${
                isFocused ? 'border-[#ffffff]' : 'border-[#444444]'
              } disabled:opacity-50`}
            />
            {/* Blinking cursor effect for flavor */}
            {isFocused && (
              <motion.div
                className="absolute right-0 bottom-2 w-2 h-4 bg-[#ffffff]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </div>
          <motion.button
            type="submit"
            disabled={!topic.trim() || isRunning}
            whileHover={!isRunning && topic.trim() ? { backgroundColor: '#e2e2e2' } : {}}
            whileTap={!isRunning && topic.trim() ? { scale: 0.98 } : {}}
            className="px-6 py-3 bg-[#ffffff] text-[#000000] text-label-md font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? 'EXECUTING...' : 'INITIATE'}
          </motion.button>
        </div>
      </form>

      {/* Suggestions */}
      <AnimatePresence>
        {!isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <span className="text-label-sm text-[#444444] py-1">SUGGESTIONS:</span>
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => handleSuggestionClick(s)}
                className="px-2 py-1 text-label-sm text-[#c6c6c6] bg-[#111111] technical-border hover:bg-[#1a1a1a] hover:text-[#ffffff] transition-colors cursor-pointer"
              >
                {s.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
