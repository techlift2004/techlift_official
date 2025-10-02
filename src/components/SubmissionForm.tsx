import { useState } from 'react';
import { Send, Image, Link, Github, Video } from 'lucide-react';
import { supabase } from '../lib/supabase';

type EventType = 'hackathon' | 'daily' | 'weekly';

interface SubmissionFormProps {
  selectedEvent: EventType;
  onSubmitSuccess: () => void;
}

export function SubmissionForm({ selectedEvent, onSubmitSuccess }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    project_name: '',
    project_description: '',
    image_url: '',
    demo_link: '',
    github_link: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase.from('projects').insert([
        {
          ...formData,
          event_type: selectedEvent,
        },
      ]);

      if (submitError) throw submitError;

      setFormData({
        project_name: '',
        project_description: '',
        image_url: '',
        demo_link: '',
        github_link: '',
      });

      onSubmitSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-xl p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Submit Your Project</h3>
        <p className="text-gray-400 text-sm">
          Share your creation with the TechLift community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Name
          </label>
          <input
            type="text"
            required
            value={formData.project_name}
            onChange={(e) =>
              setFormData({ ...formData, project_name: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Description
          </label>
          <textarea
            required
            rows={4}
            value={formData.project_description}
            onChange={(e) =>
              setFormData({ ...formData, project_description: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
            placeholder="Describe your project..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Image className="w-4 h-4" />
            Image URL
          </label>
          <input
            type="url"
            required
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Video className="w-4 h-4" />
            Demo Link
          </label>
          <input
            type="url"
            required
            value={formData.demo_link}
            onChange={(e) =>
              setFormData({ ...formData, demo_link: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub Link
          </label>
          <input
            type="url"
            required
            value={formData.github_link}
            onChange={(e) =>
              setFormData({ ...formData, github_link: e.target.value })
            }
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
            placeholder="https://github.com/..."
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Project
            </>
          )}
        </button>
      </form>
    </div>
  );
}
