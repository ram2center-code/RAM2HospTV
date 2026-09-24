import React from 'react';
import { Volume2, VolumeX, Tv, Maximize2, Minimize2, Play, Pause, Radio, Moon, Sun } from 'lucide-react';
import { TvZone, TvTheme } from '../types';

interface TvHeaderProps {
  currentZone: TvZone;
  focusedIndex: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isRemoteOpen: boolean;
  onToggleRemote: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
  tvFontSize: 'normal' | 'large';
  onToggleFontSize: () => void;
  theme: TvTheme;
  onToggleTheme: () => void;
  onSelectAction: (action: string) => void;
}

export const TvHeader: React.FC<TvHeaderProps> = ({
  currentZone,
  focusedIndex,
  soundEnabled,
  onToggleSound,
  isRemoteOpen,
  onToggleRemote,
  isFullscreen,
  onToggleFullscreen,
  isAutoPlay,
  onToggleAutoPlay,
  tvFontSize,
  onToggleFontSize,
  theme,
  onToggleTheme,
  onSelectAction,
}) => {
  const isHeaderFocused = currentZone === 'header';
  const isDark = theme === 'dark';

  return (
    <header
      className={`w-full flex items-center justify-between px-4 sm:px-8 py-2 sm:py-2.5 backdrop-blur-md border-b transition-colors duration-300 z-30 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-sm'
          : 'bg-white/95 border-sky-100 text-slate-800 shadow-xs'
      }`}
    >
      {/* Brand & Hospital Lockup (Identical aesthetic to RAM2+ HOSPITAL in Ex_tv.jpg) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* RAM2+ Hospital Brand Emblem */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5 leading-none">
              <span
                className={`text-2xl sm:text-3xl font-black tracking-tighter font-['Plus_Jakarta_Sans',sans-serif] ${
                  isDark ? 'text-white' : 'text-sky-900'
                }`}
              >
                RAM<span className="text-sky-500">2</span>
              </span>
              <span className="text-lg sm:text-xl font-bold text-sky-400 font-mono -translate-y-1">
                +
              </span>
            </div>
            <span
              className={`text-[10px] sm:text-xs font-black tracking-widest uppercase mt-0.5 ${
                isDark ? 'text-sky-400/90' : 'text-sky-700/80'
              }`}
            >
              HOSPITAL
            </span>
          </div>

          <div
            className={`hidden md:block h-9 w-[1.5px] mx-1 ${
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            }`}
          ></div>

          {/* Patient Room Indicator */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  isDark
                    ? 'bg-sky-950 text-sky-300 border border-sky-800/60'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                ห้อง 808
              </span>
              <span
                className={`text-xs font-bold ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                คุณสมชาย วิจิตรศิลป์
              </span>
            </div>
            <p
              className={`text-[11px] font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Executive Deluxe Suite · HN: 67-048291
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isDark
              ? 'bg-slate-800/90 border border-slate-700 text-sky-300'
              : 'bg-sky-50 border border-sky-200 text-sky-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ระบบบริการผู้ป่วยใน (Inpatient Care)</span>
        </div>
      </div>

      {/* Center TV Remote Usage Guide (Prominent for in-bed patient viewing) */}
      <div
        className={`hidden xl:flex items-center gap-3 px-4 py-1.5 rounded-2xl border text-xs font-medium ${
          isDark
            ? 'bg-slate-800/80 border-slate-700 text-slate-300'
            : 'bg-sky-50/90 border border-sky-200/80 text-slate-600'
        }`}
      >
        <span
          className={`font-bold flex items-center gap-1 ${
            isDark ? 'text-sky-400' : 'text-sky-800'
          }`}
        >
          <Tv className="w-4 h-4 text-sky-500" /> รีโมททีวี:
        </span>
        <span
          className={`px-2 py-0.5 rounded shadow-xs font-mono text-[11px] font-bold ${
            isDark
              ? 'bg-slate-700 text-sky-300 border border-slate-600'
              : 'bg-white text-sky-800 border border-sky-200'
          }`}
        >
          ◀ ▶ ▲ ▼ เลื่อน
        </span>
        <span
          className={`px-2 py-0.5 rounded shadow-xs font-mono text-[11px] font-bold ${
            isDark
              ? 'bg-slate-700 text-sky-300 border border-slate-600'
              : 'bg-white text-sky-800 border border-sky-200'
          }`}
        >
          [OK] เลือก
        </span>
        <span
          className={`px-2 py-0.5 rounded shadow-xs font-mono text-[11px] font-bold ${
            isDark
              ? 'bg-slate-700 text-sky-300 border border-slate-600'
              : 'bg-white text-sky-800 border border-sky-200'
          }`}
        >
          [ESC] ย้อนกลับ
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* 0: Auto Presentation Rotation Toggle */}
        <button
          onClick={() => {
            onToggleAutoPlay();
            onSelectAction('autoplay');
          }}
          title="สลับโหมดเลื่อนอัตโนมัติ"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 0
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : isAutoPlay
              ? isDark
                ? 'bg-sky-950 text-sky-300 border border-sky-800'
                : 'bg-sky-100 text-sky-800'
              : isDark
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isAutoPlay ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>เลื่อนภาพ (ON)</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>เลื่อนภาพ</span>
            </>
          )}
        </button>

        {/* 1: Font Scale Switcher (Extra large for distance) */}
        <button
          onClick={() => {
            onToggleFontSize();
            onSelectAction('fontsize');
          }}
          title="สลับขนาดตัวอักษรสำหรับคนไข้"
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 1
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : isDark
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {tvFontSize === 'large' ? 'ตัวอักษร: ใหญ่' : 'ตัวอักษร: ปกติ'}
        </button>

        {/* 2: Dark / Light Theme Toggle */}
        <button
          onClick={() => {
            onToggleTheme();
            onSelectAction('theme');
          }}
          title={isDark ? 'เปลี่ยนเป็นโหมดสว่าง (Light Theme)' : 'เปลี่ยนเป็นโหมดมืด (Dark Theme)'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 2
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : isDark
              ? 'bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>โหมดสว่าง</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>โหมดมืด</span>
            </>
          )}
        </button>

        {/* 3: Audio feedback toggle */}
        <button
          onClick={() => {
            onToggleSound();
            onSelectAction('sound');
          }}
          title={soundEnabled ? 'ปิดเสียงรีโมท' : 'เปิดเสียงรีโมท'}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 3
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : soundEnabled
              ? isDark
                ? 'bg-sky-950 text-sky-300 border border-sky-800'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
              : isDark
              ? 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* 4: Virtual TV Remote Widget Controller */}
        <button
          onClick={() => {
            onToggleRemote();
            onSelectAction('remote');
          }}
          title="เปิด/ปิด แผงรีโมทจำลองบนจอ"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 4
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : isRemoteOpen
              ? 'bg-sky-600 text-white shadow-sm'
              : isDark
              ? 'bg-slate-800 text-sky-400 hover:bg-slate-700 border border-slate-700'
              : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>รีโมทเสมือน</span>
        </button>

        {/* 5: Fullscreen TV Mode */}
        <button
          onClick={() => {
            onToggleFullscreen();
            onSelectAction('fullscreen');
          }}
          title="โหมดเต็มหน้าจอ TV"
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isHeaderFocused && focusedIndex === 5
              ? 'bg-sky-600 text-white ring-4 ring-sky-300 shadow-md scale-105'
              : isDark
              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
