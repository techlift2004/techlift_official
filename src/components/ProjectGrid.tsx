import { useEffect, useState } from 'react';
import { Github, Video, Calendar, Trophy, Zap } from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

type EventType = 'hackathon' | 'daily' | 'weekly';

interface ProjectGridProps {
  selectedEvent: EventType;
  refreshTrigger: number;
}

export function ProjectGrid({ selectedEvent, refreshTrigger }: ProjectGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    const subscription = supabase
      .channel('projects_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'projects',
          filter: `event_type=eq.${selectedEvent}`,
        },
        (payload) => {
          setProjects((current) => [payload.new as Project, ...current]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [selectedEvent, refreshTrigger]);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('event_type', selectedEvent)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'hackathon':
        return Trophy;
      case 'daily':
        return Zap;
      case 'weekly':
        return Calendar;
      default:
        return Trophy; // fallback icon
    }
  };

  const getEventColor = (type: EventType) => {
    switch (type) {
      case 'hackathon':
        return 'text-green-500';
      case 'daily':
        return 'text-green-400';
      case 'weekly':
        return 'text-green-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex p-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-4">
          <Trophy className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
        <p className="text-gray-400">Be the first to submit a project!</p>
      </div>
    );
  }

  const EventIcon = getEventIcon(selectedEvent);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-xl overflow-hidden hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
        >
          <div className="relative h-48 overflow-hidden bg-black">
            <img
              src={project.image_url}
              alt={project.project_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-green-500/30 rounded-full">
                {EventIcon && (
                  <EventIcon className={`w-4 h-4 ${getEventColor(selectedEvent)}`} />
                )}
                <span className="text-xs font-medium text-gray-300 capitalize">
                  {selectedEvent}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                {project.project_name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3">
                {project.project_description}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-green-500/10">
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium transition-colors"
              >
                <Video className="w-4 h-4" />
                Demo
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
