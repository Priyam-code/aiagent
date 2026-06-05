import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogEntry } from '../types';

interface LiveLogsProps {
  logs: LogEntry[];
}

const typeIcons: Record<string, string> = {
  info: '>',
  success: '+',
  warning: '!',
  data: '#',
};

export default function LiveLogs({ logs }: LiveLogsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  if (logs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-4"
    >
      <div className="border border-[#262626] bg-[#000000]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#262626] bg-[#111111]">
          <span className="text-label-sm text-[#888888] flex-1">EXECUTION_LOG.TXT</span>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-[#ffffff]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-label-sm text-[#ffffff]">LIVE</span>
          </div>
        </div>

        {/* Log entries */}
        <div
          ref={containerRef}
          className="max-h-48 overflow-y-auto p-4 font-mono text-sm space-y-1 bg-[#000000]"
        >
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3"
              >
                <span className="text-[#888888] shrink-0 w-[70px]">
                  {new Date(log.timestamp).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
                <span className="text-[#444444] shrink-0 w-24 uppercase">
                  [{log.step.substring(0,4)}]
                </span>
                <span className="text-[#ffffff] shrink-0 w-4 text-center">
                  {typeIcons[log.type] || '>'}
                </span>
                <span
                  className={`${
                    log.type === 'success'
                      ? 'text-[#ffffff] font-bold'
                      : log.type === 'warning'
                      ? 'text-[#c6c6c6] underline decoration-[#c6c6c6] decoration-dotted underline-offset-4'
                      : 'text-[#888888]'
                  }`}
                >
                  {log.message.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
