import React, { useState, useEffect } from 'react';
import { Tv, Film, BedDouble, ChevronUp } from 'lucide-react';
import { TvZone, TvTheme } from '../types';

interface BottomNavBarProps {
  currentZone: TvZone;
  focusedIndex: number;
  onSelectMenu: (id: string) => void;
  tvFontSize: 'normal' | 'large';
  theme: TvTheme;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentZone,
  focusedIndex,
  onSelectMenu,
  tvFontSize,
  theme,
}) => {
  const isBottomFocused = currentZone === 'bottom';
  const isDark = theme === 'dark';

  // Live real-time clock state matching Ex_tv.jpg
  const [timeStr, setTimeStr] = useState('14:30 น.');
  const [thaiDateStr, setThaiDateStr] = useState('วันพฤหัสบดีที่ 24 พฤษภาคม 2567');
  const [engDateStr, setEngDateStr] = useState('Thursday, May 24, 2024');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes} น.`);

      const thaiDays = [
        'วันอาทิตย์ที่',
        'วันจันทร์ที่',
        'วันอังคารที่',
        'วันพุธที่',
        'วันพฤหัสบดีที่',
        'วันศุกร์ที่',
        'วันเสาร์ที่',
      ];
      const thaiMonths = [
        'มกราคม',
        'กุมภาพันธ์',
        'มีนาคม',
        'เมษายน',
        'พฤษภาคม',
        'มิถุนายน',
        'กรกฎาคม',
        'สิงหาคม',
        'กันยายน',
        'ตุลาคม',
        'พฤศจิกายน',
        'ธันวาคม',
      ];

      const dayName = thaiDays[now.getDay()];
      const dayNum = now.getDate();
      const monthName = thaiMonths[now.getMonth()];
      const thaiYear = now.getFullYear() + 543;
      setThaiDateStr(`${dayName} ${dayNum} ${monthName} ${thaiYear}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      setEngDateStr(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // EXACTLY THREE ITEMS AS REQUESTED:
  // 1. ทีวี ช่องต่างๆ TV CHANNELS
  // 2. ความบันเทิง ENTERTAINMENT
  // 3. ข้อมูลห้องพัก ROOM INFORMATION
  const menuItems = [
    {
      id: 'tv-channels',
      icon: Tv,
      titleTh: 'ทีวี ช่องต่างๆ',
      titleEn: 'TV CHANNELS',
      isCustomTvIcon: true,
    },
    {
      id: 'entertainment',
      icon: Film,
      titleTh: 'ความบันเทิง',
      titleEn: 'ENTERTAINMENT',
      isCustomEntertainmentIcon: true,
    },
    {
      id: 'room-info',
      icon: BedDouble,
      titleTh: 'ข้อมูลห้องพัก',
      titleEn: 'ROOM INFORMATION',
      isCustomBedIcon: true,
    },
  ];

  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 py-1 z-20">
      {/* Exactly 3 Navigable Cards matching Ex_tv.jpg */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 py-1 px-1">
        {menuItems.map((item, idx) => {
          const isFocused = isBottomFocused && focusedIndex === idx;

          return (
            <button
              key={item.id}
              onClick={() => onSelectMenu(item.id)}
              className={`group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-[22px] transition-all duration-300 text-center shrink-0 w-[145px] sm:w-[170px] lg:w-[195px] h-[118px] sm:h-[132px] lg:h-[142px] cursor-pointer outline-none ${
                isFocused
                  ? isDark
                    ? 'bg-slate-800 ring-4 ring-sky-400 ring-offset-2 ring-offset-slate-950 border-sky-400 shadow-2xl shadow-sky-500/25 scale-105 -translate-y-1'
                    : 'bg-white ring-4 ring-sky-500 ring-offset-2 border-sky-400 shadow-2xl shadow-sky-500/35 scale-105 -translate-y-1'
                  : isDark
                  ? 'bg-slate-900/90 hover:bg-slate-800 border-2 border-slate-800 hover:border-slate-700 shadow-xl'
                  : 'bg-white/95 hover:bg-white border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl shadow-md'
              }`}
            >
              {/* Focus Glow Indicator */}
              {isFocused && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider animate-bounce">
                  <ChevronUp className="w-3 h-3" />
                  <span>กด [OK]</span>
                </div>
              )}

              {/* Icon Container matching the exact graphic styling of Ex_tv.jpg */}
              <div
                className={`w-12 h-10 sm:w-16 sm:h-12 rounded-xl flex items-center justify-center transition-all ${
                  isFocused
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 scale-105'
                    : isDark
                    ? 'text-sky-400 bg-slate-800/90 border border-slate-700 group-hover:bg-slate-700'
                    : 'text-sky-700 bg-sky-50/80 border border-sky-200/90 group-hover:bg-sky-100/80'
                }`}
              >
                {/* 1. TV icon stylized with blue TV screen outline */}
                {item.id === 'tv-channels' && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-5.5 sm:w-9 sm:h-6 border-2 border-current rounded-md flex items-center justify-center font-bold text-[10px] sm:text-xs">
                      TV
                    </div>
                    <div className="w-3.5 h-0.5 bg-current mt-0.5 rounded-full"></div>
                  </div>
                )}

                {/* 2. Entertainment icon with film and game controller style */}
                {item.id === 'entertainment' && (
                  <div className="flex items-center gap-0.5">
                    <div className="w-6 h-6 border-2 border-current rounded-md flex items-center justify-center p-0.5">
                      <div className="w-0 h-0 border-t-[3.5px] border-t-transparent border-l-[6px] border-l-current border-b-[3.5px] border-b-transparent translate-x-0.5"></div>
                    </div>
                    <span className="text-xs font-bold opacity-80">+</span>
                    <div className="w-5 h-3.5 border-2 border-current rounded-sm flex items-center justify-center gap-0.5 text-[7px] font-mono">
                      ::
                    </div>
                  </div>
                )}

                {/* 3. Bed icon stylized for hospital room information */}
                {item.id === 'room-info' && (
                  <div className="flex items-center justify-center">
                    <BedDouble className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                  </div>
                )}
              </div>

              {/* Bilingual Labels matching Ex_tv.jpg */}
              <div className="space-y-0.5 mt-1 w-full">
                <p
                  className={`font-black leading-tight font-['Prompt',sans-serif] ${
                    tvFontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  } ${isDark ? 'text-white' : 'text-slate-900'} ${
                    isFocused ? (isDark ? 'text-sky-300 font-extrabold' : 'text-sky-950 font-extrabold') : ''
                  }`}
                >
                  {item.titleTh}
                </p>
                <p
                  className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${
                    isDark ? 'text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {item.titleEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right End: Exact Date & Time Clock matching Ex_tv.jpg */}
      <div className="flex flex-col items-end text-right shrink-0 px-2 sm:px-4 py-1">
        {/* Giant TV Clock (Ex_tv.jpg: 14:30 น.) */}
        <div
          className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-mono tabular-nums leading-none ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {timeStr}
        </div>

        {/* Thai Date (Bold) */}
        <div
          className={`font-bold tracking-tight mt-1 font-['Prompt',sans-serif] ${
            tvFontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
          } ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
        >
          {thaiDateStr}
        </div>

        {/* English Date */}
        <div
          className={`text-[11px] sm:text-xs font-medium tracking-wide font-['Plus_Jakarta_Sans',sans-serif] ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {engDateStr}
        </div>
      </div>
    </div>
  );
};
