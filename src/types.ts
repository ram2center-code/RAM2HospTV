export type TvZone = 'header' | 'hero' | 'side' | 'bottom';
export type TvTheme = 'light' | 'dark';

export interface FocusCoordinate {
  zone: TvZone;
  index: number;
}

export interface TvChannel {
  id: string;
  number: number;
  name: string;
  category: 'free_tv' | 'news' | 'health' | 'entertainment' | 'kids';
  currentShow: string;
  nextShow: string;
  isHd: boolean;
  color: string;
}

export interface StreamingShow {
  id: string;
  title: string;
  genre: string;
  badge?: string;
  duration?: string;
  synopsis: string;
  youtubeVideoId?: string;
}

export interface StreamingApp {
  id: string;
  name: string;
  nameTh: string;
  brandColor: string;
  bgGradient: string;
  badgeColor: string;
  tagline: string;
  taglineTh: string;
  iconType: 'youtube' | 'netflix' | 'iqiyi' | 'youku' | 'wetv' | 'viu';
  featuredShows: StreamingShow[];
}

export interface EntertainmentItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'movie' | 'music' | 'podcast' | 'relaxation';
  duration: string;
  thumbnailColor: string;
  description: string;
}

export interface PatientRoomInfo {
  roomNumber: string;
  roomType: string;
  patientName: string;
  hn: string;
  admissionDate: string;
  doctorName: string;
  doctorSpecialty: string;
  nurseName: string;
  nurseDutyHours: string;
  nurseExtension: string;
  nextMeal: {
    mealName: string;
    time: string;
    menu: string;
    dietType: string;
  };
  todaySchedules: {
    time: string;
    activity: string;
    detail: string;
    status: 'done' | 'next' | 'upcoming';
  }[];
  facilities: {
    name: string;
    detail: string;
  }[];
  wifi: {
    ssid: string;
    password: string;
  };
}

export interface HospitalSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  hospitalName: string;
  hospitalNameEn: string;
  tagline: string;
  taglineEn: string;
  doctorLead: string;
  nurseLead: string;
}
