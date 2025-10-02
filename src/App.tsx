import { useState } from 'react';
import { Hero } from './components/Hero';
import { EventSelector } from './components/EventSelector';
import { SubmissionForm } from './components/SubmissionForm';
import { ProjectGrid } from './components/ProjectGrid';

type EventType = 'hackathon' | 'daily' | 'weekly';

function App() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmitSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black">
      <Hero />

      <EventSelector
        selectedEvent={selectedEvent}
        onSelectEvent={setSelectedEvent}
      />

      {selectedEvent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <SubmissionForm
                  selectedEvent={selectedEvent}
                  onSubmitSuccess={handleSubmitSuccess}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Submitted Projects
                </h2>
                <p className="text-gray-400">
                  Explore amazing projects from our community
                </p>
              </div>
              <ProjectGrid
                selectedEvent={selectedEvent}
                refreshTrigger={refreshTrigger}
              />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-green-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} TechLift Official. Empowering
              developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
