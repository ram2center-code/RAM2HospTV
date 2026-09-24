/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TvZone, FocusCoordinate, TvTheme } from './types';
import {
  HOSPITAL_SLIDES,
  TV_CHANNELS,
  ENTERTAINMENT_ITEMS,
  PATIENT_ROOM_INFO,
  STREAMING_APPS,
} from './data/mockHospitalData';
import {
  playNavSound,
  playSelectSound,
  playBackSound,
  setSoundEnabled,
} from './utils/audio';
import { TvHeader } from './components/TvHeader';
import { MainHeroStage } from './components/MainHeroStage';
import { SideCardsGrid } from './components/SideCardsGrid';
import { BottomNavBar } from './components/BottomNavBar';
import { VirtualTvRemote } from './components/VirtualTvRemote';
import { PlanDetailModals } from './components/PlanDetailModals';
import { VolumeOsd } from './components/VolumeOsd';

export default function App() {
  // Navigation State
  const [focus, setFocus] = useState<FocusCoordinate>({ zone: 'bottom', index: 0 });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Patient & Hospital Data State
  const [slides] = useState(HOSPITAL_SLIDES);
  const [channels] = useState(TV_CHANNELS);
  const [entertainment] = useState(ENTERTAINMENT_ITEMS);
  const [streamingApps] = useState(STREAMING_APPS);
  const [roomInfo] = useState(PATIENT_ROOM_INFO);

  // Presentation Player State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);

  // TV Device Settings
  const [soundOn, setSoundOn] = useState(true);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [tvFontSize, setTvFontSize] = useState<'normal' | 'large'>('large');

  // TV Theme (Dark Mode / Light Mode)
  const [theme, setTheme] = useState<TvTheme>(() => {
    try {
      const saved = localStorage.getItem('tv_theme');
      return saved === 'dark' || saved === 'light' ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: TvTheme = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('tv_theme', next);
      } catch {}
      if (soundOn) playSelectSound();
      return next;
    });
  }, [soundOn]);

  // Volume OSD
  const [volume, setVolume] = useState(70);
  const [volumeOsdVisible, setVolumeOsdVisible] = useState(false);
  const volumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // App container ref
  const appContainerRef = useRef<HTMLDivElement>(null);

  // Sound handler
  const handleToggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playSelectSound();
  }, [soundOn]);

  // Volume adjuster
  const handleVolumeChange = useCallback(
    (delta: number) => {
      setVolume((prev) => {
        const next = Math.max(0, Math.min(100, prev + delta));
        if (soundOn) playNavSound();
        return next;
      });
      setVolumeOsdVisible(true);
      if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
      volumeTimerRef.current = setTimeout(() => {
        setVolumeOsdVisible(false);
      }, 2000);
    },
    [soundOn],
  );

  // Toggle Fullscreen
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Slide transition logic
  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setSlideProgress(0);
    if (soundOn) playNavSound();
  }, [slides.length, soundOn]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setSlideProgress(0);
    if (soundOn) playNavSound();
  }, [slides.length, soundOn]);

  // Slide timer tick (15s rotation per slide)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((s) => (s + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  // Selection Action handler for current focus point
  const handleActivateCurrentFocus = useCallback(() => {
    if (activeModal) return;

    if (soundOn) playSelectSound();

    const { zone, index } = focus;

    if (zone === 'bottom') {
      // Exactly 3 items:
      // 0: TV Channels
      // 1: Entertainment
      // 2: Room Info
      if (index === 0) setActiveModal('tv-channels');
      else if (index === 1) setActiveModal('entertainment');
      else if (index === 2) setActiveModal('room-info');
    } else if (zone === 'hero') {
      if (index === 0 || index === 4) {
        setActiveModal('broadcast');
      } else if (index === 1) {
        handlePrevSlide();
      } else if (index === 2) {
        setIsPlaying((p) => !p);
      } else if (index === 3) {
        handleNextSlide();
      }
    } else if (zone === 'side') {
      setActiveModal('room-info');
    } else if (zone === 'header') {
      if (index === 0) {
        setIsAutoPlay((a) => !a);
        setIsPlaying((p) => !p);
      } else if (index === 1) {
        setTvFontSize((f) => (f === 'large' ? 'normal' : 'large'));
      } else if (index === 2) {
        handleToggleTheme();
      } else if (index === 3) {
        handleToggleSound();
      } else if (index === 4) {
        setIsRemoteOpen((r) => !r);
      } else if (index === 5) {
        handleToggleFullscreen();
      }
    }
  }, [
    activeModal,
    focus,
    soundOn,
    handlePrevSlide,
    handleNextSlide,
    handleToggleTheme,
    handleToggleSound,
    handleToggleFullscreen,
  ]);

  // Spatial D-Pad Navigation Engine
  const handleNavigate = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (activeModal) return;

      if (soundOn) playNavSound();

      setFocus((prev) => {
        const { zone, index } = prev;

        switch (direction) {
          case 'up': {
            if (zone === 'bottom') {
              // 3 items: index 0 and 1 go to hero, index 2 goes to side
              if (index <= 1) {
                return { zone: 'hero', index: 0 };
              } else {
                return { zone: 'side', index: 1 };
              }
            } else if (zone === 'hero' || zone === 'side') {
              return { zone: 'header', index: 0 };
            }
            return prev;
          }

          case 'down': {
            if (zone === 'header') {
              return { zone: 'hero', index: 0 };
            } else if (zone === 'hero') {
              return { zone: 'bottom', index: 0 };
            } else if (zone === 'side') {
              return { zone: 'bottom', index: 2 };
            }
            return prev;
          }

          case 'left': {
            if (zone === 'bottom') {
              // 3 items wrap around: 0, 1, 2
              const nextIndex = (index - 1 + 3) % 3;
              return { zone: 'bottom', index: nextIndex };
            } else if (zone === 'header') {
              const nextIndex = (index - 1 + 6) % 6;
              return { zone: 'header', index: nextIndex };
            } else if (zone === 'side') {
              return { zone: 'hero', index: 0 };
            } else if (zone === 'hero') {
              if (index > 0) {
                return { zone: 'hero', index: index - 1 };
              }
            }
            return prev;
          }

          case 'right': {
            if (zone === 'bottom') {
              // 3 items wrap around: 0, 1, 2
              const nextIndex = (index + 1) % 3;
              return { zone: 'bottom', index: nextIndex };
            } else if (zone === 'header') {
              const nextIndex = (index + 1) % 6;
              return { zone: 'header', index: nextIndex };
            } else if (zone === 'hero') {
              if (index < 4) {
                return { zone: 'hero', index: index + 1 };
              } else {
                return { zone: 'side', index: 0 };
              }
            } else if (zone === 'side') {
              return { zone: 'side', index: (index + 1) % 2 };
            }
            return prev;
          }

          default:
            return prev;
        }
      });
    },
    [activeModal, soundOn],
  );

  // Back action (Esc)
  const handleBack = useCallback(() => {
    if (activeModal) {
      if (soundOn) playBackSound();
      setActiveModal(null);
    } else {
      if (soundOn) playBackSound();
      setFocus({ zone: 'bottom', index: 0 });
    }
  }, [activeModal, soundOn]);

  // Home action
  const handleHome = useCallback(() => {
    if (soundOn) playSelectSound();
    setActiveModal(null);
    setFocus({ zone: 'bottom', index: 0 });
    setCurrentSlideIndex(0);
    setSlideProgress(0);
  }, [soundOn]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        if (e.key === 'Escape') {
          handleBack();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleNavigate('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleNavigate('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleNavigate('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNavigate('right');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleActivateCurrentFocus();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          handleBack();
          break;
        case 'm':
        case 'M':
          handleToggleSound();
          break;
        case 'f':
        case 'F':
          handleToggleFullscreen();
          break;
        case 't':
        case 'T':
          handleToggleTheme();
          break;
        case '+':
        case '=':
          handleVolumeChange(5);
          break;
        case '-':
        case '_':
          handleVolumeChange(-5);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleNavigate,
    handleActivateCurrentFocus,
    handleBack,
    handleToggleTheme,
    handleToggleSound,
    handleToggleFullscreen,
    handleVolumeChange,
  ]);

  const isDark = theme === 'dark';

  return (
    <div
      ref={appContainerRef}
      className={`h-screen max-h-screen w-screen overflow-hidden flex flex-col justify-between font-['Prompt','Plus_Jakarta_Sans',sans-serif] relative selection:bg-sky-500 selection:text-white transition-colors duration-300 ${
        isDark
          ? 'bg-slate-950 text-slate-100'
          : 'bg-gradient-to-br from-sky-100/70 via-white to-blue-100/60 text-slate-800'
      } ${
        tvFontSize === 'large' ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full blur-3xl transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-br from-sky-950/40 via-sky-900/20 to-transparent'
              : 'bg-gradient-to-br from-sky-200/30 to-transparent'
          }`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-3xl transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-tl from-indigo-950/40 via-blue-950/20 to-transparent'
              : 'bg-gradient-to-tl from-blue-200/30 to-transparent'
          }`}
        />
      </div>

      {/* 1. TV Header Zone with RAM2+ Brand */}
      <div className="shrink-0 z-30">
        <TvHeader
          currentZone={focus.zone}
          focusedIndex={focus.index}
          soundEnabled={soundOn}
          onToggleSound={handleToggleSound}
          isRemoteOpen={isRemoteOpen}
          onToggleRemote={() => setIsRemoteOpen((o) => !o)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          isAutoPlay={isAutoPlay}
          onToggleAutoPlay={() => {
            setIsAutoPlay((a) => !a);
            setIsPlaying((p) => !p);
          }}
          tvFontSize={tvFontSize}
          onToggleFontSize={() => setTvFontSize((f) => (f === 'large' ? 'normal' : 'large'))}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onSelectAction={() => {}}
        />
      </div>

      {/* 2. Main Stage Area (Fluid 1-Screen TV layout, zero overflow) */}
      <main className="flex-1 min-h-0 w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-10 py-2 sm:py-3 z-10 flex flex-col justify-between gap-3 sm:gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch flex-1 min-h-0">
          {/* Main Hero Showcase (Left 65% area) */}
          <div className="lg:col-span-8 flex flex-col h-full min-h-0">
            <MainHeroStage
              currentZone={focus.zone}
              focusedIndex={focus.index}
              slides={slides}
              currentSlideIndex={currentSlideIndex}
              isPlaying={isPlaying}
              slideProgress={slideProgress}
              onTogglePlay={() => setIsPlaying((p) => !p)}
              onNextSlide={handleNextSlide}
              onPrevSlide={handlePrevSlide}
              onSelectSlide={(idx) => {
                setCurrentSlideIndex(idx);
                setSlideProgress(0);
              }}
              onOpenSlideDetail={() => setActiveModal('broadcast')}
              tvFontSize={tvFontSize}
              theme={theme}
            />
          </div>

          {/* Right Side Stacked Cards (Right 35% area) */}
          <div className="lg:col-span-4 flex flex-col h-full min-h-0">
            <SideCardsGrid
              currentZone={focus.zone}
              focusedIndex={focus.index}
              roomInfo={roomInfo}
              onOpenRoomModal={() => setActiveModal('room-info')}
              tvFontSize={tvFontSize}
              theme={theme}
            />
          </div>
        </div>

        {/* 3. Bottom Navigation: EXACTLY 3 CARDS AS REQUESTED */}
        <div className="shrink-0">
          <BottomNavBar
            currentZone={focus.zone}
            focusedIndex={focus.index}
            onSelectMenu={(id) => setActiveModal(id)}
            tvFontSize={tvFontSize}
            theme={theme}
          />
        </div>
      </main>

      {/* 4. On-Screen Volume Display (OSD) */}
      <VolumeOsd volume={volume} visible={volumeOsdVisible} soundEnabled={soundOn} />

      {/* 5. Virtual Smart TV Remote Control */}
      <VirtualTvRemote
        isOpen={isRemoteOpen}
        onClose={() => setIsRemoteOpen(false)}
        onNavigate={handleNavigate}
        onSelect={handleActivateCurrentFocus}
        onBack={handleBack}
        onHome={handleHome}
        onVolumeChange={handleVolumeChange}
        onToggleSound={handleToggleSound}
        soundEnabled={soundOn}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 6. Patient In-Room Detail Modals */}
      <PlanDetailModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        channels={channels}
        entertainment={entertainment}
        streamingApps={streamingApps}
        roomInfo={roomInfo}
        slides={slides}
        tvFontSize={tvFontSize}
        theme={theme}
      />
    </div>
  );
}
