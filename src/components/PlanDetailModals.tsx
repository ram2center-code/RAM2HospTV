import React, { useState, useEffect } from 'react';
import {
  X,
  Tv,
  Film,
  BedDouble,
  Play,
  Pause,
  BellRing,
  CheckCircle2,
  Clock,
  Utensils,
  Wifi,
  PhoneCall,
  Sparkles,
  HeartPulse,
  Music,
  ExternalLink,
  ChevronRight,
  MonitorPlay,
  Flame,
  Star,
  Check,
  Maximize2,
  Minimize2,
  Search,
} from 'lucide-react';
import {
  TvChannel,
  EntertainmentItem,
  PatientRoomInfo,
  HospitalSlide,
  StreamingApp,
  StreamingShow,
  TvTheme,
} from '../types';

interface PlanDetailModalsProps {
  activeModal: string | null;
  onClose: () => void;
  channels: TvChannel[];
  entertainment: EntertainmentItem[];
  streamingApps: StreamingApp[];
  roomInfo: PatientRoomInfo;
  slides: HospitalSlide[];
  tvFontSize: 'normal' | 'large';
  theme: TvTheme;
}

export const PlanDetailModals: React.FC<PlanDetailModalsProps> = ({
  activeModal,
  onClose,
  channels,
  entertainment,
  streamingApps,
  roomInfo,
  slides,
  tvFontSize,
  theme,
}) => {
  const isDark = theme === 'dark';
  // TV Channel Player State
  const [selectedChannel, setSelectedChannel] = useState<TvChannel>(channels[0]);
  const [isPlayingChannel, setIsPlayingChannel] = useState(true);
  const [channelFilter, setChannelFilter] = useState<string>('all');

  // Entertainment Streaming App State
  const [selectedApp, setSelectedApp] = useState<StreamingApp>(streamingApps[0]); // default YouTube
  const [activeShow, setActiveShow] = useState<StreamingShow>(streamingApps[0].featuredShows[0]);
  const [isAppPlaying, setIsAppPlaying] = useState(false);
  const [isYoutubeFullscreen, setIsYoutubeFullscreen] = useState(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [entertainmentTab, setEntertainmentTab] = useState<'streaming' | 'hospital_relax'>('streaming');

  // Hospital Relax Item State
  const [selectedRelaxItem, setSelectedRelaxItem] = useState<EntertainmentItem>(entertainment[0]);
  const [isPlayingRelax, setIsPlayingRelax] = useState(false);

  // Meal Order State
  const [selectedMealOption, setSelectedMealOption] = useState<string>(roomInfo.nextMeal.menu);
  const [mealOrderConfirmed, setMealOrderConfirmed] = useState(false);

  // Extract YouTube ID helper
  const extractYoutubeId = (input: string): string => {
    if (!input) return 'lFcSrYw-ARY';
    const clean = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
    const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) return match[1];
    return clean;
  };

  // Keyboard listener for Fullscreen YouTube: Escape/Backspace key exits fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isYoutubeFullscreen && (e.key === 'Escape' || e.key === 'Backspace')) {
        e.stopPropagation();
        e.preventDefault();
        setIsYoutubeFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isYoutubeFullscreen]);

  if (!activeModal) return null;

  const filteredChannels = channels.filter((ch) => {
    if (channelFilter === 'all') return true;
    return ch.category === channelFilter;
  });

  // Switch streaming app
  const handleSelectApp = (app: StreamingApp) => {
    if (selectedApp.id === app.id && app.id === 'youtube') {
      // If clicking YouTube again when already selected, open full-screen YouTube directly!
      setIsAppPlaying(true);
      setIsYoutubeFullscreen(true);
      return;
    }
    setSelectedApp(app);
    setActiveShow(app.featuredShows[0]);
    setIsAppPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-5xl rounded-[36px] shadow-2xl border-2 overflow-hidden flex flex-col max-h-[92vh] ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-sky-100 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 sm:px-8 py-4 sm:py-5 border-b flex items-center justify-between ${
            isDark
              ? 'border-slate-800 bg-slate-950/90 text-white'
              : 'border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50/50'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/30">
              {activeModal === 'tv-channels' && <Tv className="w-6 h-6 stroke-[2.2]" />}
              {activeModal === 'entertainment' && <Film className="w-6 h-6 stroke-[2.2]" />}
              {activeModal === 'room-info' && <BedDouble className="w-6 h-6 stroke-[2.2]" />}
              {activeModal === 'broadcast' && <Sparkles className="w-6 h-6 stroke-[2.2]" />}
            </div>
            <div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Prompt',sans-serif] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {activeModal === 'tv-channels' && 'ทีวี ช่องต่างๆ (TV CHANNELS)'}
                {activeModal === 'entertainment' && 'ความบันเทิง (ENTERTAINMENT & STREAMING)'}
                {activeModal === 'room-info' && 'ข้อมูลห้องพัก (ROOM INFORMATION)'}
                {activeModal === 'broadcast' && 'ข้อมูลโรงพยาบาลและบริการในห้องพัก'}
              </h2>
              <p
                className={`text-xs font-semibold tracking-wide ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                กดปุ่ม [ESC] บนรีโมทหรือคลิกปุ่มปิดเพื่อกลับสู่หน้าจอหลัก
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-2xl transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title="ปิดหน้าต่าง [ESC]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* ================= MODAL 1: TV CHANNELS ================= */}
          {activeModal === 'tv-channels' && (
            <div className="space-y-6">
              {/* Simulated Live TV Screen */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video max-h-[340px] flex flex-col justify-between p-6 text-white shadow-xl border-2 border-slate-800">
                {/* Channel OSD Banner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-md font-mono">
                      {selectedChannel.number}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <span>{selectedChannel.name}</span>
                        {selectedChannel.isHd && (
                          <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded uppercase">
                            HD
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-sky-200">
                        กำลังออกอากาศ: {selectedChannel.currentShow}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">LIVE BROADCAST</span>
                  </div>
                </div>

                {/* TV Screen Center Graphics */}
                <div className="my-auto text-center space-y-2">
                  <p className="text-2xl sm:text-3xl font-black font-['Prompt',sans-serif] tracking-wide text-white drop-shadow-md">
                    {selectedChannel.currentShow}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    รายการถัดไป: {selectedChannel.nextShow}
                  </p>
                </div>

                {/* Bottom TV Controls */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                  <span>เสียงความคมชัดสูง Dolby Digital · สัญญาณเคเบิลโรงพยาบาล</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingChannel(!isPlayingChannel)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold cursor-pointer"
                    >
                      {isPlayingChannel ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingChannel ? 'หยุดชั่วคราว' : 'รับชมต่อ'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Channel Selector List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-base font-bold ${
                      isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}
                  >
                    ผังรายการและช่องทีวีทั้งหมด (เลือกช่องที่ต้องการรับชม)
                  </h3>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setChannelFilter('all')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        channelFilter === 'all'
                          ? 'bg-sky-600 text-white shadow-xs'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      ทั้งหมด ({channels.length})
                    </button>
                    <button
                      onClick={() => setChannelFilter('free_tv')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        channelFilter === 'free_tv'
                          ? 'bg-sky-600 text-white shadow-xs'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      ฟรีทีวี ดิจิทัล
                    </button>
                    <button
                      onClick={() => setChannelFilter('health')}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        channelFilter === 'health'
                          ? 'bg-sky-600 text-white shadow-xs'
                          : isDark
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      สุขภาพ & สาระคดี
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredChannels.map((ch) => {
                    const isSelected = selectedChannel.id === ch.id;
                    return (
                      <div
                        key={ch.id}
                        onClick={() => setSelectedChannel(ch)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? isDark
                              ? 'bg-sky-950/70 border-sky-400 shadow-md scale-102 text-white'
                              : 'bg-sky-50/90 border-sky-500 shadow-md scale-102 text-slate-900'
                            : isDark
                            ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800 text-slate-200'
                            : 'bg-white border-slate-200/80 hover:border-sky-300 hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg text-white shadow-xs bg-gradient-to-tr ${ch.color}`}
                        >
                          {ch.number}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-bold text-sm truncate ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {ch.name}
                          </p>
                          <p
                            className={`text-xs truncate mt-0.5 ${
                              isDark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {ch.currentShow}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= MODAL 2: ENTERTAINMENT (YOUTUBE, NETFLIX, IQIYI, YOUKU, WETV, VIU) ================= */}
          {activeModal === 'entertainment' && (
            <div className="space-y-6">
              {/* Entertainment Mode Tabs */}
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEntertainmentTab('streaming')}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                      entertainmentTab === 'streaming'
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <MonitorPlay className="w-4 h-4" />
                    <span>แอปสตรีมมิ่งยอดนิยม (Streaming Apps)</span>
                  </button>

                  <button
                    onClick={() => setEntertainmentTab('hospital_relax')}
                    className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                      entertainmentTab === 'hospital_relax'
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Music className="w-4 h-4" />
                    <span>ดนตรีบำบัด & ธรรมะโรงพยาบาล</span>
                  </button>
                </div>

                <span
                  className={`hidden md:inline-flex text-xs font-bold px-3 py-1 rounded-full border ${
                    isDark
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }`}
                >
                  ห้อง 808 สิทธิ์ VIP Premium เชื่อมต่อพร้อมใช้งาน
                </span>
              </div>

              {/* TAB 1: 6 STREAMING PLATFORMS (Youtube, Netflix, Iqiyi, Youku, WeTV, Viu) */}
              {entertainmentTab === 'streaming' && (
                <div className="space-y-6">
                  {/* The 6 Requested Streaming Platforms Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p
                        className={`text-xs sm:text-sm font-bold ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        เลือกแอปพลิเคชันเพื่อเปิดบน Smart TV (กดปุ่มบนรีโมทหรือคลิกเพื่อเลือกแอป):
                      </p>
                      <span className="text-xs text-slate-400 font-mono">6 แพลตฟอร์มรองรับ</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {streamingApps.map((app) => {
                        const isSelected = selectedApp.id === app.id;

                        return (
                          <button
                            key={app.id}
                            onClick={() => handleSelectApp(app)}
                            className={`group relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer min-h-[125px] outline-none ${
                              isSelected
                                ? isDark
                                  ? 'bg-slate-800 ring-4 ring-sky-400 ring-offset-2 ring-offset-slate-900 border-sky-400 shadow-xl shadow-sky-500/20 scale-105 -translate-y-1'
                                  : 'bg-white ring-4 ring-sky-500 ring-offset-2 border-sky-400 shadow-xl shadow-sky-500/20 scale-105 -translate-y-1'
                                : isDark
                                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-md'
                                : 'bg-slate-50/80 hover:bg-white border-slate-200 hover:border-sky-300 hover:shadow-md'
                            }`}
                          >
                            {/* Selected Checkmark Badge */}
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-md text-xs font-bold">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}

                            {/* App Logo Emblem */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110">
                              {/* 1. YouTube */}
                              {app.id === 'youtube' && (
                                <div className="w-12 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-md">
                                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-white border-b-[5px] border-b-transparent translate-x-0.5"></div>
                                </div>
                              )}

                              {/* 2. Netflix */}
                              {app.id === 'netflix' && (
                                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-red-600 font-black text-2xl tracking-tighter shadow-md border border-zinc-800">
                                  N
                                </div>
                              )}

                              {/* 3. iQIYI */}
                              {app.id === 'iqiyi' && (
                                <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
                                  iQ
                                </div>
                              )}

                              {/* 4. YOUKU */}
                              {app.id === 'youku' && (
                                <div className="w-11 h-11 bg-gradient-to-tr from-sky-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xs tracking-tight shadow-md">
                                  YOUKU
                                </div>
                              )}

                              {/* 5. WeTV */}
                              {app.id === 'wetv' && (
                                <div className="w-11 h-11 bg-gradient-to-tr from-amber-500 to-sky-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">
                                  WeTV
                                </div>
                              )}

                              {/* 6. Viu */}
                              {app.id === 'viu' && (
                                <div className="w-11 h-11 bg-[#FECB00] rounded-xl flex items-center justify-center text-slate-950 font-black text-sm tracking-tight shadow-md">
                                  Viu
                                </div>
                              )}
                            </div>

                            {/* App Title & Label */}
                            <div className="mt-2 w-full">
                              <p
                                className={`font-black text-sm leading-tight ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              >
                                {app.name}
                              </p>
                              <p
                                className={`text-[10px] font-semibold truncate mt-0.5 ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                {app.nameTh}
                              </p>
                              {app.id === 'youtube' && isSelected && (
                                <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded-md shadow-xs animate-pulse">
                                  <Maximize2 className="w-2.5 h-2.5" />
                                  กดดูเต็มจอ
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Smart TV App Screen Launcher & Featured Shows Showcase */}
                  <div
                    className={`rounded-3xl overflow-hidden p-6 sm:p-7 text-white shadow-2xl bg-gradient-to-br ${selectedApp.bgGradient} border-2 border-white/20 transition-all`}
                  >
                    {/* App Header Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-white text-lg border border-white/20">
                          {selectedApp.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl sm:text-2xl font-black font-['Prompt',sans-serif]">
                              {selectedApp.name} บน Smart TV
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                              In-Room VIP
                            </span>
                          </div>
                          <p className="text-xs text-white/80 mt-0.5">
                            {selectedApp.taglineTh}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {selectedApp.id === 'youtube' && (
                          <button
                            onClick={() => {
                              setIsAppPlaying(true);
                              setIsYoutubeFullscreen(true);
                            }}
                            className="px-4 py-1.5 rounded-xl bg-white text-red-600 hover:bg-red-50 text-xs font-black shadow-lg flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
                            title="เปิด YouTube เต็มจอ [ESC เพื่อออก]"
                          >
                            <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>เปิด YouTube เต็มจอ</span>
                          </button>
                        )}
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>เชื่อมต่อพร้อมดูทันที</span>
                        </span>
                      </div>
                    </div>

                    {/* Active Playback Simulator or Featured Banner */}
                    <div className="py-6">
                      {isAppPlaying ? (
                        /* Simulated / Live Embedded Video Player */
                        <div className="rounded-2xl bg-black/85 backdrop-blur-md p-4 sm:p-6 border border-white/20 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                              <span className="text-xs font-mono text-white/90 font-bold uppercase">
                                กำลังเล่นบน {selectedApp.name} · ความละเอียด 4K HDR
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedApp.id === 'youtube' ? (
                                <button
                                  onClick={() => setIsYoutubeFullscreen(true)}
                                  className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center gap-1 shadow-md cursor-pointer transition-all hover:scale-105"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                  <span>ขยายเต็มจอ</span>
                                </button>
                              ) : (
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">
                                  ระบบเสียงสเตอริโอโรงพยาบาล
                                </span>
                              )}
                            </div>
                          </div>

                          {selectedApp.id === 'youtube' ? (
                            /* Real Embedded YouTube Video Preview inside Modal */
                            <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[360px] bg-black border border-white/20 shadow-2xl group flex items-center justify-center">
                              <iframe
                                src={`https://www.youtube.com/embed/${activeShow.youtubeVideoId || 'lFcSrYw-ARY'}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                                title={activeShow.title}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                              {/* Overlay click to trigger full screen */}
                              <button
                                onClick={() => setIsYoutubeFullscreen(true)}
                                className="absolute top-3 right-3 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-black flex items-center gap-1.5 shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 z-10 border border-white/30"
                                title="ขยายเต็มหน้าจอ [ESC เพื่อออก]"
                              >
                                <Maximize2 className="w-4 h-4" />
                                <span>ขยายเต็มจอ (Full Screen)</span>
                              </button>
                            </div>
                          ) : (
                            <div className="text-center py-6 space-y-2">
                              <p className="text-2xl sm:text-3xl font-black font-['Prompt',sans-serif]">
                                {activeShow.title}
                              </p>
                              <p className="text-sm text-sky-200 font-medium">
                                หมวดหมู่: {activeShow.genre} · {activeShow.duration}
                              </p>
                              <p className="text-xs text-white/70 max-w-xl mx-auto pt-1">
                                {activeShow.synopsis}
                              </p>
                            </div>
                          )}

                          {/* Video Scrubber bar (for non-YouTube or info) */}
                          {selectedApp.id !== 'youtube' && (
                            <div className="space-y-1">
                              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-2/5 h-full bg-sky-400 rounded-full animate-pulse"></div>
                              </div>
                              <div className="flex items-center justify-between text-[11px] text-white/60 font-mono">
                                <span>18:24</span>
                                <span>{activeShow.duration || '45:00'}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <button
                              onClick={() => setIsAppPlaying(false)}
                              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer"
                            >
                              กลับไปหน้ารายการ
                            </button>

                            <div className="flex items-center gap-2">
                              {selectedApp.id === 'youtube' && (
                                <button
                                  onClick={() => setIsYoutubeFullscreen(true)}
                                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black shadow-lg cursor-pointer flex items-center gap-1.5 transition-all hover:scale-105"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                  <span>เปิด YouTube เต็มจอ</span>
                                </button>
                              )}
                              <button
                                onClick={() => setIsAppPlaying(false)}
                                className="px-5 py-2 rounded-xl bg-white text-slate-900 text-xs font-black shadow-md cursor-pointer flex items-center gap-1.5"
                              >
                                <Pause className="w-4 h-4 fill-current" />
                                <span>หยุดชั่วคราว</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Selected Show Feature Card */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          <div className="lg:col-span-8 space-y-3">
                            <div className="flex items-center gap-2">
                              {activeShow.badge && (
                                <span className="text-xs font-black px-3 py-1 rounded-full bg-white/20 border border-white/30 flex items-center gap-1 text-white">
                                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                                  {activeShow.badge}
                                </span>
                              )}
                              <span className="text-xs text-white/80 font-medium">
                                {activeShow.genre}
                              </span>
                            </div>

                            <h4 className="text-2xl sm:text-3xl font-black font-['Prompt',sans-serif] leading-tight">
                              {activeShow.title}
                            </h4>

                            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-2xl">
                              {activeShow.synopsis}
                            </p>

                            <p className="text-xs text-white/60 font-mono">
                              ความยาว/จำนวนตอน: {activeShow.duration}
                            </p>

                            <div className="pt-2 flex flex-wrap items-center gap-3">
                              <button
                                onClick={() => {
                                  setIsAppPlaying(true);
                                  if (selectedApp.id === 'youtube') {
                                    setIsYoutubeFullscreen(true);
                                  }
                                }}
                                className="px-6 py-3 rounded-2xl bg-white hover:bg-sky-50 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                              >
                                <Play className="w-4 h-4 fill-current" />
                                <span>{selectedApp.id === 'youtube' ? 'เปิด YouTube เต็มจอทันที' : 'เปิดรับชมเรื่องนี้ทันที'}</span>
                              </button>

                              {selectedApp.id === 'youtube' ? (
                                <button
                                  onClick={() => {
                                    setIsAppPlaying(true);
                                    setIsYoutubeFullscreen(true);
                                  }}
                                  className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                  <span>เปิด YouTube เต็มจอ (Full Screen)</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => setIsAppPlaying(true)}
                                  className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/25 transition-all cursor-pointer"
                                >
                                  เปิดแอป {selectedApp.name} เต็มจอ
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="lg:col-span-4 flex flex-col gap-2">
                            <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                              รายการแนะนำบน {selectedApp.name}:
                            </p>
                            {selectedApp.featuredShows.map((show) => {
                              const isActive = activeShow.id === show.id;
                              return (
                                <div
                                  key={show.id}
                                  onClick={() => setActiveShow(show)}
                                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                    isActive
                                      ? 'bg-white/25 border-white shadow-md'
                                      : 'bg-white/10 border-white/10 hover:bg-white/20'
                                  }`}
                                >
                                  <p className="font-bold text-xs text-white truncate">
                                    {show.title}
                                  </p>
                                  <div className="flex items-center justify-between text-[11px] text-white/70 mt-1">
                                    <span>{show.genre}</span>
                                    <span className="font-mono">{show.duration}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Helper Bar */}
                    <div className="border-t border-white/15 pt-3 flex flex-wrap items-center justify-between text-xs text-white/70">
                      <span>คำแนะนำ: กดปุ่มลูกศรบนรีโมท เพื่อเลือกเปลี่ยนแอปหรือเลือกรายการ</span>
                      <span className="font-bold text-white">กด [OK] เพื่อเล่นภาพยนตร์</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HOSPITAL RELAXATION SOUNDSCAPES & DHAMMA */}
              {entertainmentTab === 'hospital_relax' && (
                <div className="space-y-6">
                  {/* Player Bar */}
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-xs">
                        <Music className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">
                          เสียงบำบัดสำหรับผู้พักฟื้นในห้องพัก
                        </span>
                        <h3 className="text-lg font-black font-['Prompt',sans-serif]">
                          {selectedRelaxItem.title}
                        </h3>
                        <p className="text-xs text-sky-100 mt-0.5">
                          ความยาว: {selectedRelaxItem.duration} · {selectedRelaxItem.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => setIsPlayingRelax(!isPlayingRelax)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-900 font-bold text-sm shadow-md transition-all cursor-pointer"
                      >
                        {isPlayingRelax ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>หยุดชั่วคราว</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>เปิดฟังทันที</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Catalog */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entertainment.map((item) => {
                      const isSelected = selectedRelaxItem.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedRelaxItem(item)}
                          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                            isSelected
                              ? isDark
                                ? 'bg-sky-950/70 border-sky-400 shadow-md text-white'
                                : 'bg-sky-50/90 border-sky-500 shadow-md'
                              : isDark
                              ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800 text-slate-100'
                              : 'bg-white border-slate-200/80 hover:border-sky-300 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-md inline-block mb-1.5 ${
                                isDark
                                  ? 'bg-sky-950 text-sky-300 border border-sky-800/50'
                                  : 'text-sky-700 bg-sky-100/80'
                              }`}
                            >
                              {item.titleEn}
                            </span>
                            <h4
                              className={`font-bold text-base leading-snug ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p
                              className={`text-xs mt-1 line-clamp-2 ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              {item.description}
                            </p>
                          </div>

                          <div
                            className={`pt-3 border-t flex items-center justify-between text-xs ${
                              isDark
                                ? 'border-slate-700 text-slate-400'
                                : 'border-slate-100 text-slate-500'
                            }`}
                          >
                            <span
                              className={`font-mono font-bold ${
                                isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}
                            >
                              ความยาว {item.duration}
                            </span>
                            <span className="font-bold text-sky-500">
                              {isSelected ? 'กำลังเลือกรายการนี้' : 'คลิกเพื่อเลือก'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= MODAL 3: ROOM INFORMATION ================= */}
          {activeModal === 'room-info' && (
            <div className="space-y-6">
              {/* Patient Identity & Room Overview Card */}
              <div
                className={`p-6 rounded-3xl border-2 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                  isDark
                    ? 'bg-slate-800/90 border-slate-700 text-slate-100'
                    : 'bg-gradient-to-r from-sky-50 via-white to-blue-50 border-sky-200'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xl font-black font-mono px-3 py-1 rounded-xl ${
                        isDark ? 'bg-sky-950 text-sky-300' : 'bg-sky-100 text-sky-900'
                      }`}
                    >
                      ห้อง {roomInfo.roomNumber}
                    </span>
                    <span
                      className={`text-lg font-black ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {roomInfo.patientName}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isDark ? 'text-slate-300 bg-slate-700' : 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      HN: {roomInfo.hn}
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    ประเภทห้อง:{' '}
                    <span
                      className={`font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}
                    >
                      {roomInfo.roomType}
                    </span>{' '}
                    · วันที่เข้าพัก: {roomInfo.admissionDate}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border shadow-xs ${
                    isDark
                      ? 'bg-slate-700/80 text-sky-300 border-slate-600'
                      : 'bg-sky-100/80 text-sky-800 border-sky-200'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 text-sky-500" />
                  <span>เคาน์เตอร์พยาบาลชั้น 8 (โทรภายใน 1808)</span>
                </div>
              </div>

              {/* Care Team on Duty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-5 rounded-2xl border-2 shadow-xs space-y-2 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-sky-100'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <HeartPulse className="w-4 h-4 text-sky-500" />
                    <span>แพทย์เจ้าของไข้ (Attending Physician)</span>
                  </div>
                  <p
                    className={`text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {roomInfo.doctorName}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {roomInfo.doctorSpecialty}
                  </p>
                  <p
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg inline-block ${
                      isDark
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    ตรวจเยี่ยมประจำวันแล้ว (อาการคงที่และตอบสนองการรักษาได้ดี)
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border-2 shadow-xs space-y-2 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-sky-100'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                    <PhoneCall className="w-4 h-4 text-sky-500" />
                    <span>พยาบาลประจำห้อง (Primary Nurse)</span>
                  </div>
                  <p
                    className={`text-base font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {roomInfo.nurseName}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    เวรปฏิบัติงาน: {roomInfo.nurseDutyHours}
                  </p>
                  <p
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg inline-block ${
                      isDark
                        ? 'bg-sky-950/60 text-sky-300 border border-sky-800/60'
                        : 'text-sky-800 bg-sky-50'
                    }`}
                  >
                    {roomInfo.nurseExtension}
                  </p>
                </div>
              </div>

              {/* Meal & Dining Selection */}
              <div
                className={`p-6 rounded-3xl border-2 space-y-3 ${
                  isDark
                    ? 'bg-slate-800/80 border-amber-900/60 text-slate-100'
                    : 'bg-amber-50/70 border-amber-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex items-center gap-2 font-black text-base ${
                      isDark ? 'text-amber-300' : 'text-amber-900'
                    }`}
                  >
                    <Utensils className="w-5 h-5 text-amber-500" />
                    <span>มื้ออาหารวันนี้และการสั่งอาหาร (Meal Ordering)</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isDark
                        ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                        : 'text-amber-800 bg-amber-100'
                    }`}
                  >
                    {roomInfo.nextMeal.mealName} ({roomInfo.nextMeal.time})
                  </span>
                </div>

                <p
                  className={`text-xs font-medium ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {roomInfo.nextMeal.menu}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span
                    className={`text-xs font-bold ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    เลือกเมนูอื่นที่ต้องการ:
                  </span>
                  {[
                    'ข้าวต้มปลากะพงทรงเครื่อง',
                    'โจ๊กอกไก่ตุ๋นเห็ดหอม',
                    'ซุปผักรวมและเต้าหู้อ่อน',
                  ].map((menuItem) => (
                    <button
                      key={menuItem}
                      onClick={() => {
                        setSelectedMealOption(menuItem);
                        setMealOrderConfirmed(true);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedMealOption === menuItem
                          ? 'bg-amber-600 text-white shadow-xs'
                          : isDark
                          ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
                      }`}
                    >
                      {menuItem}
                    </button>
                  ))}
                </div>

                {mealOrderConfirmed && (
                  <p
                    className={`text-xs font-bold p-2.5 rounded-xl border flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/70'
                        : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>บันทึกความประสงค์สั่ง: "{selectedMealOption}" ส่งข้อมูลไปยังแผนกโภชนาการเรียบร้อยแล้ว</span>
                  </p>
                )}
              </div>

              {/* Wi-Fi & Facilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-5 rounded-2xl border space-y-2 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 font-bold text-sm ${
                      isDark ? 'text-sky-400' : 'text-slate-800'
                    }`}
                  >
                    <Wifi className="w-4 h-4 text-sky-500" />
                    <span>สัญญาณ Wi-Fi สำหรับผู้ป่วยและผู้เฝ้าไข้</span>
                  </div>
                  <p
                    className={`text-xs font-mono font-bold ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    ชื่อ Wi-Fi: {roomInfo.wifi.ssid}
                  </p>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {roomInfo.wifi.password}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border space-y-2 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 font-bold text-sm ${
                      isDark ? 'text-sky-400' : 'text-slate-800'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-sky-500" />
                    <span>กำหนดการให้ยาและการวัดสัญญาณชีพ</span>
                  </div>
                  <p
                    className={`text-xs ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    รอบถัดไป: 15:00 น. (พยาบาลเวรบ่ายนำยาและตรวจวัดความดัน)
                  </p>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    รอบค่ำ: 20:00 น. ก่อนเข้านอน
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODAL 4: BROADCAST / HOSPITAL INFO ================= */}
          {activeModal === 'broadcast' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slides.map((s) => (
                  <div
                    key={s.id}
                    className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between space-y-3 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-100'
                        : 'bg-white border-sky-100'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block ${
                          isDark
                            ? 'bg-sky-950 text-sky-300 border border-sky-800/60'
                            : 'text-sky-700 bg-sky-50'
                        }`}
                      >
                        {s.badge}
                      </span>
                      <h4
                        className={`text-base font-bold leading-snug mb-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {s.title}
                      </h4>
                      <p
                        className={`text-xs font-semibold mb-2 ${
                          isDark ? 'text-sky-400' : 'text-sky-600'
                        }`}
                      >
                        {s.subtitle}
                      </p>
                    </div>

                    <div
                      className={`pt-3 border-t text-xs ${
                        isDark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      <p>แพทย์: {s.doctorLead}</p>
                      <p>พยาบาล: {s.nurseLead}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 sm:px-8 py-4 border-t flex items-center justify-between ${
            isDark
              ? 'border-slate-800 bg-slate-950/90 text-slate-400'
              : 'border-slate-100 bg-slate-50 text-slate-500'
          }`}
        >
          <span className="text-xs font-medium">
            Smart Patient In-Room Entertainment & Care System · รองรับรีโมทคอนโทรล
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            ปิดหน้าต่าง [ESC]
          </button>
        </div>
      </div>

      {/* ================= FULL-SCREEN YOUTUBE SMART TV EXPERIENCE ================= */}
      {isYoutubeFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col animate-in fade-in duration-200">
          {/* Top TV HUD Bar */}
          <div className="shrink-0 px-4 sm:px-6 py-2.5 bg-gradient-to-b from-black/95 via-black/80 to-transparent flex items-center justify-between z-20 gap-3 border-b border-white/10 backdrop-blur-md">
            {/* Left: Brand & Status */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-7 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent translate-x-0.5"></div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-sm text-white tracking-wide">
                    YouTube Smart TV
                  </span>
                  <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase">
                    In-Room VIP 4K
                  </span>
                  <span className="hidden md:inline text-xs text-slate-400 font-medium">
                    ห้อง {roomInfo.roomNumber} · {roomInfo.patientName}
                  </span>
                </div>
                <p className="text-xs text-sky-300 font-bold truncate max-w-lg mt-0.5">
                  ▶ กำลังเล่น: {activeShow.title}
                </p>
              </div>
            </div>

            {/* Center: Recommended Quick Programs */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 font-semibold mr-1">
                เปลี่ยนรายการ:
              </span>
              {selectedApp.featuredShows.map((show) => {
                const isCurrent = activeShow.id === show.id;
                return (
                  <button
                    key={show.id}
                    onClick={() => setActiveShow(show)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer truncate max-w-[170px] ${
                      isCurrent
                        ? 'bg-red-600 text-white shadow-md scale-105 ring-2 ring-white/30'
                        : 'bg-white/15 text-slate-200 hover:bg-white/25 border border-white/15'
                    }`}
                    title={show.title}
                  >
                    {show.title.split(' ')[0]} {show.title.split(' ')[1] || ''}
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Tools & Exit */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSearchModal(!showSearchModal)}
                className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                title="ค้นหาหรือวางลิงก์ YouTube ที่ต้องการ"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ใส่ลิงก์/ค้นหา</span>
              </button>

              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                title="สลับโหมดจอเต็มเบราว์เซอร์"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">จอเต็มทีวี</span>
              </button>

              {/* High-contrast Exit Button */}
              <button
                onClick={() => setIsYoutubeFullscreen(false)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              >
                <Minimize2 className="w-4 h-4" />
                <span>[ESC] ออกจากเต็มจอ</span>
              </button>
            </div>
          </div>

          {/* Search or Custom Link Input Tray */}
          {showSearchModal && (
            <div className="px-6 py-3 bg-zinc-900 border-b border-white/15 flex items-center gap-3 z-30 shadow-2xl">
              <span className="text-xs text-white font-bold shrink-0">
                วางลิงก์ YouTube หรือ Video ID:
              </span>
              <input
                type="text"
                value={customYoutubeUrl}
                onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                placeholder="เช่น https://www.youtube.com/watch?v=... หรือ รหัสวิดีโอ 11 หลัก"
                className="flex-1 px-4 py-2 rounded-xl bg-black border border-white/25 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => {
                  const vid = extractYoutubeId(customYoutubeUrl);
                  if (vid) {
                    setActiveShow({
                      id: 'custom-' + Date.now(),
                      title: 'วิดีโอ YouTube ที่เลือก (' + vid + ')',
                      genre: 'วิดีโอที่กำหนดเอง',
                      duration: 'ตามวิดีโอ',
                      synopsis: 'วิดีโอที่เปิดโดยผู้ใช้งานในห้องพัก',
                      youtubeVideoId: vid,
                    });
                    setShowSearchModal(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                เปิดเล่นวิดีโอนี้
              </button>
              <button
                onClick={() => setShowSearchModal(false)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>
          )}

          {/* Main Full-Viewport Video Canvas */}
          <div className="flex-1 w-full h-full relative bg-black flex items-center justify-center overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${activeShow.youtubeVideoId || 'lFcSrYw-ARY'}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={activeShow.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Bottom TV Helper Bar */}
          <div className="shrink-0 px-6 py-2.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between text-xs text-slate-400 z-20 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">{activeShow.title}</span>
              <span className="hidden sm:inline text-slate-600">·</span>
              <span className="hidden sm:inline text-sky-400 font-semibold">{activeShow.genre}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium">
                💡 คำแนะนำ: กดปุ่ม [ESC] บนคีย์บอร์ด หรือปุ่ม [Back] บนรีโมท เพื่อกลับสู่หน้าจอระบบโรงพยาบาล
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
