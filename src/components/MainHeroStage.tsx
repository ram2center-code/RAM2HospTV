import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Maximize, HeartPulse, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { HospitalSlide, TvZone, TvTheme } from '../types';

interface MainHeroStageProps {
  currentZone: TvZone;
  focusedIndex: number;
  slides: HospitalSlide[];
  currentSlideIndex: number;
  isPlaying: boolean;
  slideProgress: number;
  onTogglePlay: () => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onSelectSlide: (index: number) => void;
  onOpenSlideDetail: () => void;
  tvFontSize: 'normal' | 'large';
  theme: TvTheme;
}

export const MainHeroStage: React.FC<MainHeroStageProps> = ({
  currentZone,
  focusedIndex,
  slides,
  currentSlideIndex,
  isPlaying,
  slideProgress,
  onTogglePlay,
  onNextSlide,
  onPrevSlide,
  onSelectSlide,
  onOpenSlideDetail,
  tvFontSize,
  theme,
}) => {
  const slide = slides[currentSlideIndex] || slides[0];
  const isHeroFocused = currentZone === 'hero';
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative rounded-[32px] overflow-hidden border transition-all duration-300 shadow-xl flex flex-col justify-between h-full min-h-0 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-[#0b1d33] border-slate-800 text-slate-100'
          : 'bg-gradient-to-br from-white via-sky-50/60 to-blue-50/90 border-sky-100 text-slate-900'
      } ${
        isHeroFocused && focusedIndex === 0
          ? 'ring-4 ring-sky-500 ring-offset-2 border-sky-400 shadow-2xl shadow-sky-500/25 scale-[1.008]'
          : isDark
          ? 'hover:border-slate-700'
          : 'hover:border-sky-300'
      }`}
    >
      {/* Background Graphic: The iconic curved arch shape from Ex_tv.jpg */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none overflow-hidden opacity-95">
        <svg
          className="absolute -top-10 -right-10 w-full h-[120%]"
          viewBox="0 0 500 500"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Fluid welcoming curve */}
          <path
            d="M 120 0 C 60 150, 40 320, 160 500 L 500 500 L 500 0 Z"
            fill={isDark ? 'url(#curveGradDark)' : 'url(#curveGrad)'}
            opacity={isDark ? '0.3' : '0.25'}
          />
          <defs>
            <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="curveGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
          </defs>
        </svg>

        {/* Soft radial glow */}
        <div
          className={`absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isDark
              ? 'bg-gradient-to-br from-sky-600/15 to-indigo-900/10'
              : 'bg-gradient-to-br from-sky-200/40 to-blue-100/10'
          }`}
        ></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex-1 min-h-0 flex flex-col justify-between">
        {/* Top Badges & Hospital Accreditation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-600 text-white text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              {slide.badge}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isDark
                  ? 'bg-slate-800 text-sky-300 border border-slate-700'
                  : 'text-sky-800 bg-sky-100/80'
              }`}
            >
              มาตรฐานระดับสากล JCI
            </span>
          </div>

          <div
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
              isDark
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart In-Room Patient System</span>
          </div>
        </div>

        {/* Central Display: Exact visual recreation of Ex_tv.jpg's welcoming center banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center my-auto py-1">
          <div className="lg:col-span-8 space-y-2 sm:space-y-2.5">
            {/* Hospital Cross Logo Icon stylized like RAM2 */}
            <div className="inline-flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white shadow-xs">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span
                className={`text-xs font-bold tracking-wider uppercase ${
                  isDark ? 'text-sky-400' : 'text-sky-900'
                }`}
              >
                {slide.hospitalNameEn}
              </span>
            </div>

            {/* Welcome Heading (Bilingual) */}
            <h1
              className={`font-black tracking-tight leading-tight font-['Prompt',sans-serif] ${
                tvFontSize === 'large' ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
              } ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              ยินดีต้อนรับสู่ {slide.hospitalName}
            </h1>

            <p
              className={`text-xs lg:text-sm font-bold tracking-wide ${
                isDark ? 'text-sky-400' : 'text-sky-700'
              }`}
            >
              ({slide.hospitalNameEn})
            </p>

            {/* Quality Tagline matching Ex_tv.jpg: "คุณภาพที่คุณมั่นใจได้ (Quality You Can Trust)" */}
            <div className="pt-0.5">
              <p
                className={`font-black leading-snug font-['Prompt',sans-serif] ${
                  tvFontSize === 'large' ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                } ${isDark ? 'text-sky-300' : 'text-sky-800'}`}
              >
                {slide.tagline}
              </p>
              <p
                className={`text-[11px] sm:text-xs font-bold tracking-wide mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                ({slide.taglineEn})
              </p>
            </div>

            <p
              className={`leading-relaxed font-normal pt-0.5 max-w-2xl line-clamp-2 ${
                tvFontSize === 'large' ? 'text-sm' : 'text-xs'
              } ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {slide.title}
            </p>

            {/* Attending Doctor & Nurse Callout */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <div
                className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border shadow-xs ${
                  isDark
                    ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700 text-slate-200'
                    : 'bg-white/80 backdrop-blur-sm border-sky-100 text-slate-800'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-bold">
                  Dr
                </div>
                <div>
                  <p className="text-xs font-bold">{slide.doctorLead}</p>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border shadow-xs ${
                  isDark
                    ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700 text-slate-200'
                    : 'bg-white/80 backdrop-blur-sm border-sky-100 text-slate-800'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  RN
                </div>
                <div>
                  <p className="text-xs font-bold">{slide.nurseLead}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition: Doctor & Nurse Graphic illustration card */}
          <div
            className={`lg:col-span-4 flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl border-2 transition-all ${
              isDark
                ? 'bg-slate-800/70 backdrop-blur-sm border-slate-700 shadow-xl shadow-slate-950/40 text-slate-100'
                : 'bg-white/85 backdrop-blur-sm border-sky-100 shadow-lg shadow-sky-100/60 text-slate-900'
            }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 p-1 shadow-md mb-2 flex items-center justify-center">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  isDark ? 'bg-slate-900 text-sky-400' : 'bg-white text-sky-600'
                }`}
              >
                <UserCheck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>

            <p
              className={`text-xs sm:text-sm font-black text-center font-['Prompt',sans-serif] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              พร้อมดูแลคุณตลอด 24 ชั่วโมง
            </p>
            <p
              className={`text-[11px] font-semibold text-center mt-0.5 ${
                isDark ? 'text-sky-300' : 'text-sky-700'
              }`}
            >
              ด้วยความเชี่ยวชาญและมาตรฐานสากล
            </p>

            <div
              className={`mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-sky-300'
                  : 'bg-sky-50 border-sky-200 text-sky-800'
              }`}
            >
              <span>ศูนย์บริการผู้ป่วยใน: โทร 1808</span>
            </div>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2 mb-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlideIndex
                  ? 'w-8 bg-sky-500 shadow-xs'
                  : isDark
                  ? 'w-2 bg-slate-700 hover:bg-slate-600'
                  : 'w-2 bg-sky-200 hover:bg-sky-300'
              }`}
              title={`ไปยังสไลด์ที่ ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video & Presentation Media Player Bar (Exact Match with Ex_tv.jpg Bottom Bar) */}
      <div
        className={`relative z-20 px-4 sm:px-6 py-2.5 sm:py-3 border-t flex flex-col gap-1.5 transition-colors ${
          isDark
            ? 'bg-slate-950/95 border-slate-800 text-white'
            : 'bg-slate-900/95 border-slate-700/60 text-white'
        }`}
      >
        {/* Timeline Scrubber matching Ex_tv.jpg */}
        <div className="w-full flex items-center gap-3">
          <div className="relative flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-400 via-sky-300 to-white rounded-full transition-all duration-100"
              style={{ width: `${slideProgress}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-sky-200 tracking-wider font-bold whitespace-nowrap">
            {Math.floor((slideProgress / 100) * 15)}s / 15s
          </span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white pt-0.5">
          <div className="flex items-center gap-2.5">
            {/* Previous */}
            <button
              onClick={onPrevSlide}
              title="ก่อนหน้า"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isHeroFocused && focusedIndex === 1
                  ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-110 shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              title={isPlaying ? 'หยุดชั่วคราว' : 'เล่นภาพ'}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isHeroFocused && focusedIndex === 2
                  ? 'bg-sky-500 text-white ring-4 ring-sky-300 scale-110 shadow-lg shadow-sky-500/40'
                  : 'bg-white text-slate-900 hover:bg-sky-100'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={onNextSlide}
              title="ถัดไป"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isHeroFocused && focusedIndex === 3
                  ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-110 shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <span className="hidden sm:inline text-[11px] text-slate-400 border-l border-slate-700 pl-2.5 font-medium">
              วิดีโอแนะนำโรงพยาบาลและบริการในห้องพัก
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSlideDetail}
              title="เปิดดูแบบเต็มจอ"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isHeroFocused && focusedIndex === 4
                  ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-105 shadow-md'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Maximize className="w-3.5 h-3.5" />
              <span>ดูข้อมูลเต็มจอ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
