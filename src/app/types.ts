export type DivinationType = '拍摄进展' | '比稿情况' | '约会情况';
export type DivinationMethod = 'manual' | 'time';

export interface Hexagram {
  name: string;
  description: string;
  fortune: string;
  element: string;
  direction: string;
  stage: string;        // 起因经过结果
  timeFactor?: string;  // 天时地利人和
  aspect?: string;
  position?: string;
}

export interface DivinationResult {
  type: DivinationType;
  hexagrams: Hexagram[];
}
