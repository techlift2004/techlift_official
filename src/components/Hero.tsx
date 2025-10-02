import { Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-black border-b border-green-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwxOTcsMTI0LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <Zap className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold">
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                TechLift
              </span>
              <span className="text-white"> Official</span>
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Submit your innovative projects to our{' '}
            <span className="text-green-400 font-semibold">hackathons</span>,{' '}
            <span className="text-green-400 font-semibold">daily challenges</span>, and{' '}
            <span className="text-green-400 font-semibold">weekly showcases</span>
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Open for submissions</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
    </div>
  );
}
