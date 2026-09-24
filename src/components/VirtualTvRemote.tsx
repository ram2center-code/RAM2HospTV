import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Undo2,
  Home,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  X,
  Power,
  Tv,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { TvTheme } from '../types';

interface VirtualTvRemoteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onSelect: () => void;
  onBack: () => void;
  onHome: () => void;
  onVolumeChange: (delta: number) => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  theme: TvTheme;
  onToggleTheme: () => void;
}

export const VirtualTvRemote: React.FC<VirtualTvRemoteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelect,
  onBack,
  onHome,
  onVolumeChange,
  onToggleSound,
  soundEnabled,
  theme,
  onToggleTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200 select-none">
      {/* Remote Casing (Modern Sleek Smart TV Remote) */}
      <div className="w-64 bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-[36px] shadow-2xl border-2 border-slate-700/80 flex flex-col items-center">
        {/* Remote Top Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
            <Tv className="w-4 h-4" />
            <span>SMART TV REMOTE</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onHome}
              title="ปุ่มหน้าแรก (Home)"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Power className="w-3.5 h-3.5 text-rose-400" />
            </button>
            <button
              onClick={onClose}
              title="ซ่อนรีโมท"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Directional D-Pad (Up, Down, Left, Right, Center OK) */}
        <div className="relative w-44 h-44 rounded-full bg-slate-800 border border-slate-700 shadow-inner flex items-center justify-center p-2 mb-4">
          {/* Up */}
          <button
            onClick={() => onNavigate('up')}
            className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-slate-300 hover:text-sky-400 active:scale-90 transition-transform cursor-pointer"
            title="ขึ้น (Arrow Up)"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          {/* Down */}
          <button
            onClick={() => onNavigate('down')}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-10 flex items-center justify-center text-slate-300 hover:text-sky-400 active:scale-90 transition-transform cursor-pointer"
            title="ลง (Arrow Down)"
          >
            <ChevronDown className="w-6 h-6" />
          </button>

          {/* Left */}
          <button
            onClick={() => onNavigate('left')}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-slate-300 hover:text-sky-400 active:scale-90 transition-transform cursor-pointer"
            title="ซ้าย (Arrow Left)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right */}
          <button
            onClick={() => onNavigate('right')}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-12 flex items-center justify-center text-slate-300 hover:text-sky-400 active:scale-90 transition-transform cursor-pointer"
            title="ขวา (Arrow Right)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center OK Button */}
          <button
            onClick={onSelect}
            className="w-18 h-18 rounded-full bg-gradient-to-tr from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-black text-sm shadow-md active:scale-95 transition-all flex flex-col items-center justify-center border-2 border-sky-400 cursor-pointer"
            title="ปุ่มเลือก / ตกลง (OK / Enter)"
          >
            <Circle className="w-3.5 h-3.5 fill-current mb-0.5 opacity-80" />
            <span className="tracking-wider">OK</span>
          </button>
        </div>

        {/* Navigation Action Buttons (Back & Home) */}
        <div className="w-full grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
            title="ย้อนกลับ (ESC / Backspace)"
          >
            <Undo2 className="w-4 h-4 text-sky-400" />
            <span>กลับ (BACK)</span>
          </button>

          <button
            onClick={onHome}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-xs font-semibold text-slate-200 border border-slate-700 cursor-pointer"
            title="กลับหน้าหลัก (Home)"
          >
            <Home className="w-4 h-4 text-sky-400" />
            <span>หน้าแรก (HOME)</span>
          </button>
        </div>

        {/* Volume, Audio Rocker & Theme Switcher */}
        <div className="w-full flex items-center justify-between p-2 rounded-2xl bg-slate-800/80 border border-slate-700 mb-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onVolumeChange(-5)}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-300 cursor-pointer"
              title="ลดเสียง"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-400 px-1 font-bold">VOL</span>
            <button
              onClick={() => onVolumeChange(5)}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-300 cursor-pointer"
              title="เพิ่มเสียง"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 text-xs cursor-pointer"
              title={theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* Mute Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 text-xs cursor-pointer"
              title="เปิด/ปิดเสียง"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-sky-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Physical Keyboard Tip */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 text-center">
          <HelpCircle className="w-3 h-3 text-sky-400 shrink-0" />
          <span>กด [T] สลับธีม หรือ [◀ ▶ ▲ ▼] เพื่อเลื่อน</span>
        </div>
      </div>
    </div>
  );
};
