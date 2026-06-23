import { useState } from 'react';
import { BundleProvider } from './context/BundleContext.jsx';
import Accordion from './components/Accordion/Accordion.jsx';
import ReviewPanel from './components/ReviewPanel/ReviewPanel.jsx';
import CheckoutModal from './components/CheckoutModal/CheckoutModal.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import './App.css';

function AppContent() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Left Column: Builder */}
      <main className="app-main">
        <h1 className="sr-only">Build your custom Wyze security system</h1>
        <Accordion />
      </main>

      {/* Right Column: Review */}
      <aside className="app-sidebar">
        <div className="app-sidebar__sticky">
          <ReviewPanel onCheckout={() => setIsCheckoutOpen(true)} />
        </div>
      </aside>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BundleProvider>
        <AppContent />
      </BundleProvider>
    </ErrorBoundary>
  );
}

export default App;
