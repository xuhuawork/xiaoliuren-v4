import React, { useState, useEffect } from 'react';
import { DivinationResult as ResultType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion";

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
  isThinking: boolean;
}

const DivinationResult: React.FC<DivinationResultProps> = ({ result, isThinking }) => {
  const [visibleHexagrams, setVisibleHexagrams] = useState<number>(0);
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isSimplified, setIsSimplified] = useState(false);

  useEffect(() => {
    if (isThinking) {
      setVisibleHexagrams(0);
      setIsSimplified(false);
      setExplanation(null);
    } else {
      const timer = setInterval(() => {
        setVisibleHexagrams((prev) => {
          if (prev < result.hexagrams.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 1500); // Show a new hexagram every 1.5 seconds

      return () => clearInterval(timer);
    }
  }, [result.hexagrams.length, isThinking]);

  const handleExplain = async () => {
    setIsExplaining(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      setExplanation(data.explanation);
      setIsSimplified(true);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('抱歉，获取解释时出现错误。请稍后再试。');
    }
    setIsExplaining(false);
  };

  const renderSimplifiedHexagram = (hexagram: ResultType['hexagrams'][0]) => (
    <Badge 
      variant="outline" 
      className={`${getFortuneColor(hexagram.fortune)} text-white px-2 py-1 text-xs font-semibold rounded-full`}
    >
      {hexagram.name}
    </Badge>
  );

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-center">{result.type}占卜结果</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {isThinking ? (
            <motion.p
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              正在推算中...
            </motion.p>
          ) : (
            <>
              {isSimplified ? (
                <div className="mb-4 flex justify-between items-center">
                  {result.hexagrams.map((hexagram, index) => (
                    <div key={index} className="text-center">
                      {renderSimplifiedHexagram(hexagram)}
                      <p className="text-xs mt-1">{hexagram.aspect}</p>
                    </div>
                  ))}
                </div>
              ) : (
                result.hexagrams.slice(0, visibleHexagrams).map((hexagram, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{hexagram.name}</h3>
                      <Badge variant="outline">{hexagram.aspect}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{hexagram.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={`${getFortuneColor(hexagram.fortune)} text-white`}>
                        {hexagram.fortune}
                      </Badge>
                      <Badge variant="outline" className={getElementColor(hexagram.element)}>
                        {hexagram.element}
                      </Badge>
                      <Badge variant="outline">{hexagram.position}</Badge>
                    </div>
                  </motion.div>
                ))
              )}
              {visibleHexagrams === result.hexagrams.length && !isSimplified && (
                <Button onClick={handleExplain} disabled={isExplaining} className="w-full mt-4">
                  {isExplaining ? '正在解卦中...' : '解卦'}
                </Button>
              )}
              {explanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <h3 className="text-lg font-semibold mb-2">解卦结果：</h3>
                  <p className="text-gray-700">{explanation}</p>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default DivinationResult;

