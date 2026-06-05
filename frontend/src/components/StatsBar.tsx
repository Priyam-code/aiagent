import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PipelineStep } from '../types';

interface StatsBarProps {
  currentStep: PipelineStep;
  startTime: number | null;
  endTime: number | null;
  topic: string;
}

export default function StatsBar({ currentStep, startTime, endTime, topic }: StatsBarProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime || currentStep === 'idle') return;
    if (endTime) {
      setElapsed(Math.floor((endTime - startTime) / 1000));
      return;
    }

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, currentStep]);

  if (currentStep === 'idle') return null;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stepsComplete =
    currentStep === 'complete'
      ? 4
      : ['searching', 'reading', 'writing', 'critiquing'].indexOf(currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-6 flex flex-wrap items-center justify-between border-y border-[#262626] bg-[#000000] py-2 px-4 text-label-sm"
    >
      <div className="flex items-center gap-2 text-[#888888]">
        <span>TARGET:</span>
        <span className="text-[#ffffff] max-w-[200px] truncate">{topic.toUpperCase()}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#888888]">
          <span>T+</span>
          <span className="text-[#ffffff] font-mono">{formatTime(elapsed)}</span>
        </div>

        <div className="flex items-center gap-2 text-[#888888]">
          <span>SEQ:</span>
          <span className="text-[#ffffff] font-mono">{stepsComplete}/4</span>
        </div>

        <div className="flex items-center gap-2 text-[#888888]">
          <span>STATUS:</span>
          {currentStep === 'complete' ? (
            <span className="text-[#ffffff] bg-[#262626] px-1">COMPLETE</span>
          ) : (
            <span className="flex items-center gap-2 text-[#ffffff]">
              <motion.span
                className="w-2 h-2 bg-[#ffffff]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <span>{currentStep.toUpperCase()}</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
