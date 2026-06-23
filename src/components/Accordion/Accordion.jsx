import { useBundleState } from '../../context/BundleContext.jsx';
import AccordionStep from './AccordionStep.jsx';
import './Accordion.css';

export default function Accordion() {
  const { steps, activeStep } = useBundleState();

  return (
    <div className="accordion" role="tablist" aria-label="Bundle builder steps">
      {steps.map((step, index) => (
        <AccordionStep
          key={step.id}
          step={step}
          stepIndex={index}
          isOpen={activeStep === index}
          totalSteps={steps.length}
        />
      ))}
    </div>
  );
}
