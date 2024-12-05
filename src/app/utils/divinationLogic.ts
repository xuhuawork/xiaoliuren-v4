import {DivinationMethod, Hexagram} from '../types';
const MANUAL_ASPECTS = ['起因', '经过', '结果'];
const TIME_ASPECTS = ['天时', '地利', '人和'];
const hexagrams: Hexagram[] = [
    {
        name: '大安',
        description: '吉祥、心安、按部就班，稳定发展',
        fortune: '大吉',
        element: '土',
        direction: '东方',
        stage: ''
    },
    {
        name: '留连',
        description: '阻碍、拖延、喑味不明，凡事暂缓',
        fortune: '小凶',
        element: '木',
        direction: '四角',
        stage: ''
    },
    {
        name: '速喜',
        description: '迅速、短暂、时机已到、意外之喜',
        fortune: '大吉',
        element: '火',
        direction: '南方',
        stage: ''
    },
    {
        name: '赤口',
        description: '惊恐、口舌、些许麻烦、攻坚仍成',
        fortune: '大凶',
        element: '金',
        direction: '西方',
        stage: ''
    },
    {
        name: '小吉',
        description: '小有吉利，贵人相助，仍需努力',
        fortune: '小吉',
        element: '水',
        direction: '北方',
        stage: ''
    },
    {
        name: '空亡',
        description: '谎言、忧虑、晦暗不明，音信稀时',
        fortune: '凶',
        element: '土',
        direction: '中央',
        stage: ''
    },
];

export const calculateDivination = (method: DivinationMethod, input: number[] | Date) => {
    let numbers: number[];

    if (method === 'manual') {
        numbers = input as number[];
    } else {
        const date = input as Date;
        numbers = [
            date.getMonth() + 1, // 月
            date.getDate(),      // 日
            calculateTimePeriod(date.getHours()) // 时辰
        ];
    }

    const indices = calculateIndices(numbers);
    const results = indices.map((index, i) => ({
        ...hexagrams[index],
        stage: i === 0 ? '起因' : i === 1 ? '经过' : '结果',
        timeFactor: method === 'time' ? (i === 0 ? '天时' : i === 1 ? '地利' : '人和') : undefined
    }));
    return {hexagrams: results};
};

export const calculateTimePeriod = (hour: number): number => {
    return ((hour + 1) >> 1) % 12 + 1;
};

export const getTraditionalTimePeriod = (hour: number): string => {
    const timePeriods = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const index = (hour + 1) % 24 >> 1;
    return timePeriods[index] + '时';
};

const calculateIndices = (numbers: number[]): number[] => {
    const [num1, num2, num3] = numbers;

    const index1 = (num1 - 1) % 6;
    const index2 = (index1 + num2 - 1) % 6;
    const index3 = (index2 + num3 - 1) % 6;

    return [index1, index2, index3];
};
