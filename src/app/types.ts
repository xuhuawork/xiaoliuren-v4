export type DivinationType = '拍摄进展' | '比稿情况' | '约会情况';
export type DivinationMethod = 'manual' | 'time';

export interface Hexagram {
  name: string;
  description: string;
  fortune: string;
  element: string;
  direction: string;
  stage: string;
  timeFactor?: string;
  aspect?: string;
  position?: string;
}

export interface DivinationResult {
  type: DivinationType;
  hexagrams: Hexagram[];
}
