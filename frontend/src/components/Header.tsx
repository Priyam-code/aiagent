import { motion } from 'framer-motion';
import { PipelineStep } from '../types';

interface HeaderProps {
  currentStep: PipelineStep;
}

export default function Header({ currentStep }: HeaderProps) {
  const isIdle = currentStep === 'idle';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center pt-12 pb-6 md:pt-16 md:pb-8 relative z-10"
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 technical-border bg-[#111111] mb-6"
        animate={
          isIdle
            ? { rotate: [0, 90, 90, 180, 180, 270, 270, 360] }
            : { rotate: 360 }
        }
        transition={{ duration: isIdle ? 8 : 4, repeat: Infinity, ease: 'linear' }}
      >
        <span className="text-2xl text-[#c6c6c6]">▲</span>
      </motion.div>

      <motion.h1
        className="text-headline-xl mb-3 uppercase"
        layout
      >
        <span className="text-[#ffffff]">AI Research</span>{' '}
        <span className="text-[#888888]">Agent</span>
      </motion.h1>

      <motion.p
        className="text-body-md text-[#c6c6c6] max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isIdle
          ? 'SYSTEM STATUS: IDLE. WAITING FOR INPUT SEQUENCE.'
          : 'SYSTEM STATUS: ACTIVE. PIPELINE EXECUTION IN PROGRESS.'}
      </motion.p>

      {/* Agent badges */}
      {isIdle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          {[
            { label: 'SEQ-1: SEARCH' },
            { label: 'SEQ-2: READ' },
            { label: 'SEQ-3: WRITE' },
            { label: 'SEQ-4: CRITIQUE' },
          ].map((agent, i) => (
            <motion.div
              key={agent.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="px-2 py-1 bg-[#262626] text-label-sm text-[#ffffff]"
            >
              {agent.label}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
