import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeOsdProps {
  volume: number;
  visible: boolean;
  soundEnabled: boolean;
}

export const VolumeOsd: React.FC<VolumeOsdProps> = ({ volume, visible, soundEnabled }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 pointer-events-none animate-in fade-in zoom-in-95">
      <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-4 min-w-[280px]">
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-sky-400 shrink-0" />
        ) : (
          <VolumeX className="w-5 h-5 text-rose-400 shrink-0" />
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
            <span>VOLUME</span>
            <span className="text-sky-300">{soundEnabled ? `${volume}%` : 'MUTE'}</span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                soundEnabled ? 'bg-gradient-to-r from-sky-500 to-cyan-400' : 'bg-slate-500'
              }`}
              style={{ width: `${soundEnabled ? volume : 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
