import { Calendar, Zap, Trophy } from 'lucide-react';

type EventType = 'hackathon' | 'daily' | 'weekly';

interface EventSelectorProps {
  selectedEvent: EventType | null;
  onSelectEvent: (event: EventType) => void;
}

export function EventSelector({ selectedEvent, onSelectEvent }: EventSelectorProps) {
  const events = [
    {
      type: 'hackathon' as EventType,
      icon: Trophy,
      title: 'Hackathon',
      description: 'Multi-day competitive coding events',
      gradient: 'from-green-500/20 to-green-600/20',
      border: 'border-green-500/30',
      glow: 'group-hover:shadow-green-500/20',
    },
    {
      type: 'Monthly' as EventType,
      icon: Zap,
      title: 'Monthly Project',
      description: 'A month development showcases',
      gradient: 'from-green-400/20 to-green-500/20',
      border: 'border-green-400/30',
      glow: 'group-hover:shadow-green-400/20',
    },
    {
      type: 'weekly' as EventType,
      icon: Calendar,
      title: 'Weekly Project',
      description: 'Week-long development showcases',
      gradient: 'from-green-600/20 to-green-700/20',
      border: 'border-green-600/30',
      glow: 'group-hover:shadow-green-600/20',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Choose Your Event</h2>
        <p className="text-gray-400">Select the type of event you want to submit to</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => {
          const Icon = event.icon;
          const isSelected = selectedEvent === event.type;

          return (
            <button
              key={event.type}
              onClick={() => onSelectEvent(event.type)}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500 shadow-lg shadow-green-500/30'
                  : `bg-gradient-to-br ${event.gradient} ${event.border} hover:border-green-500/50 ${event.glow} hover:shadow-lg`
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative space-y-4">
                <div
                  className={`inline-flex p-3 rounded-lg ${
                    isSelected ? 'bg-green-500/20' : 'bg-green-500/10'
                  } transition-colors duration-300`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      isSelected ? 'text-green-400' : 'text-green-500'
                    } transition-colors duration-300`}
                  />
                </div>

                <div className="text-left">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
