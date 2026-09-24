import React from 'react';
import { PatientRoomInfo, TvZone, TvTheme } from '../types';

interface SideCardsGridProps {
  currentZone: TvZone;
  focusedIndex: number;
  roomInfo: PatientRoomInfo;
  onOpenRoomModal: () => void;
  tvFontSize: 'normal' | 'large';
  theme: TvTheme;
}

export const SideCardsGrid: React.FC<SideCardsGridProps> = ({
  currentZone,
  focusedIndex,
  onOpenRoomModal,
  theme,
}) => {
  const isSideFocused = currentZone === 'side';
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col gap-3 sm:gap-4 h-full min-h-0 justify-between">
      {/* 1. TOP CARD: รูปเคาน์เตอร์พยาบาลพร้อม Logo รพ. RAM2+ HOSPITAL (โชว์เฉพาะรูปตามที่ผู้ใช้กำหนด) */}
      <div
        onClick={onOpenRoomModal}
        className={`group relative flex-1 min-h-0 rounded-[24px] cursor-pointer transition-all duration-300 overflow-hidden bg-slate-900 ${
          isSideFocused && focusedIndex === 0
            ? 'ring-4 ring-sky-500 ring-offset-2 border-2 border-sky-400 shadow-2xl shadow-sky-500/25 scale-[1.01]'
            : isDark
            ? 'border-2 border-slate-800 hover:border-slate-700 hover:shadow-xl shadow-md'
            : 'border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl shadow-md'
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
          alt="เคาน์เตอร์พยาบาล โรงพยาบาลรามคำแหง 2"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* RAM2+ Hospital Logo on Counter Wall */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex items-baseline gap-0.5 leading-none">
            <span className="text-base font-black tracking-tighter text-white font-['Plus_Jakarta_Sans',sans-serif]">
              RAM<span className="text-sky-400">2</span>
            </span>
            <span className="text-sm font-bold text-sky-400 font-mono -translate-y-0.5">
              +
            </span>
          </div>
          <span className="text-[10px] font-black tracking-widest text-sky-200 uppercase">
            HOSPITAL
          </span>
        </div>
      </div>

      {/* 2. BOTTOM CARD: รูปจำลองห้องพักผู้ป่วย (โชว์เฉพาะรูปตามที่ผู้ใช้กำหนด) */}
      <div
        onClick={onOpenRoomModal}
        className={`group relative flex-1 min-h-0 rounded-[24px] cursor-pointer transition-all duration-300 overflow-hidden bg-slate-900 ${
          isSideFocused && focusedIndex === 1
            ? 'ring-4 ring-sky-500 ring-offset-2 border-2 border-sky-400 shadow-2xl shadow-sky-500/25 scale-[1.01]'
            : isDark
            ? 'border-2 border-slate-800 hover:border-slate-700 hover:shadow-xl shadow-md'
            : 'border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl shadow-md'
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80"
          alt="รูปจำลองห้องพักผู้ป่วย"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
    </div>
  );
};
