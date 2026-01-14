
export enum Role {
  USER = 'user',
  KRISHNA = 'krishna'
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  isAudioLoading?: boolean;
}

export interface GitaVerse {
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}
