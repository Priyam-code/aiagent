import { motion } from 'framer-motion';
import { STEPS, PipelineStep } from '../types';

interface PipelineProgressProps {
  currentStep: PipelineStep;
}

const stepOrder: PipelineStep[] = ['searching', 'reading', 'writing', 'critiquing'];

function getStepStatus(step: PipelineStep, currentStep: PipelineStep): 'pending' | 'active' | 'complete' {
  const currentIndex = stepOrder.indexOf(currentStep);
  const stepIndex = stepOrder.indexOf(step);

  if (currentStep === 'complete') return 'complete';
  if (currentStep === 'idle') return 'pending';
  if (stepIndex < currentIndex) return 'complete';
  if (stepIndex === currentIndex) return 'active';
  return 'pending';
}

export default function PipelineProgress({ currentStep }: PipelineProgressProps) {
  if (currentStep === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mt-12 mb-8"
    >
      <div className="flex items-start justify-between relative">
        {/* Connection line background */}
        <div className="absolute top-4 left-[12%] right-[12%] border-t border-dashed border-[#444444] z-0" />
        
        {/* Active connection line */}
        <motion.div
          className="absolute top-4 left-[12%] h-[1px] bg-[#ffffff] z-0"
          initial={{ width: '0%' }}
          animate={{
            width:
              currentStep === 'complete'
                ? '76%'
                : `${Math.max(0, stepOrder.indexOf(currentStep)) * 25.33}%`,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {STEPS.map((step, index) => {
          const status = getStepStatus(step.id, currentStep);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center relative z-10 w-1/4"
            >
              {/* Node */}
              <div
                className={`w-8 h-8 flex items-center justify-center relative transition-colors duration-500 ${
                  status === 'active'
                    ? 'bg-[#ffffff] text-[#000000]'
                    : status === 'complete'
                    ? 'bg-[#262626] text-[#ffffff] border border-[#ffffff]'
                    : 'bg-[#000000] border border-[#444444] text-[#444444]'
                }`}
              >
                {status === 'complete' ? (
                  <span className="text-label-sm">✓</span>
                ) : status === 'active' ? (
                  <motion.div
                    className="w-3 h-3 bg-[#000000]"
                    animate={{ scale: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : (
                  <span className="text-label-sm font-mono">{index + 1}</span>
                )}
                
                {/* Crosshairs for active node to look technical */}
                {status === 'active' && (
                  <>
                    <div className="absolute -top-2 left-1/2 w-[1px] h-2 bg-[#ffffff]" />
                    <div className="absolute -bottom-2 left-1/2 w-[1px] h-2 bg-[#ffffff]" />
                    <div className="absolute top-1/2 -left-2 w-2 h-[1px] bg-[#ffffff]" />
                    <div className="absolute top-1/2 -right-2 w-2 h-[1px] bg-[#ffffff]" />
                  </>
                )}
              </div>

              {/* Label */}
              <motion.div
                className={`mt-4 flex flex-col items-center ${
                  status === 'active'
                    ? 'text-[#ffffff]'
                    : status === 'complete'
                    ? 'text-[#c6c6c6]'
                    : 'text-[#444444]'
                }`}
              >
                <span className="text-label-sm text-center block">
                  {step.label.toUpperCase()}
                </span>
                <span className={`text-[10px] mt-1 max-w-[140px] text-center uppercase tracking-wider ${
                  status === 'active' ? 'text-[#c6c6c6]' : 'text-[#444444]'
                }`}>
                  {step.description}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
