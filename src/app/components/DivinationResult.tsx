import React from 'react';
import { DivinationResult as ResultType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const getFortuneColor = (fortune: string) => {
  switch (fortune) {
    case '大吉': return 'bg-green-500';
    case '小吉': return 'bg-lime-500';
    case '小凶': return 'bg-yellow-500';
    case '大凶': return 'bg-red-500';
    case '凶': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

const getElementColor = (element: string) => {
  switch (element) {
    case '金': return 'bg-yellow-200';
    case '木': return 'bg-green-200';
    case '水': return 'bg-blue-200';
    case '火': return 'bg-red-200';
    case '土': return 'bg-orange-200';
    default: return 'bg-gray-200';
  }
};

interface DivinationResultProps {
  result: ResultType;
}

const DivinationResult: React.FC<DivinationResultProps> = ({ result }) => {
  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-center">{result.type}占卜结果</CardTitle>
      </CardHeader>
      <CardContent>
        {result.hexagrams.map((hexagram, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{hexagram.name}</h3>
              <Badge variant="secondary">{hexagram.stage}</Badge>
              {hexagram.timeFactor && (
                <Badge variant="outline">{hexagram.timeFactor}</Badge>
              )}
            </div>
            <p className="text-gray-600 mb-2">{hexagram.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className={`${getFortuneColor(hexagram.fortune)} text-white`}>
                {hexagram.fortune}
              </Badge>
              <Badge variant="outline" className={getElementColor(hexagram.element)}>
                {hexagram.element}
              </Badge>
              <Badge variant="outline">{hexagram.direction}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DivinationResult;
