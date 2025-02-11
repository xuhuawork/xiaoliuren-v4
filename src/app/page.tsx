"use client";

import React, { useState } from 'react';
import DivinationForm from './components/DivinationForm';
import DivinationResult from './components/DivinationResult';
import SponsorButton from './components/SponsorButton';
import {calculateDivination} from './utils/divinationLogic';
import {DivinationType, DivinationMethod, DivinationResult as ResultType} from './types';

const Page: React.FC = () => {
    const [result, setResult] = useState<ResultType | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleDivination = async (type: DivinationType, method: DivinationMethod, input: number[] | Date) => {
        setIsThinking(true);
        const divinationResult = calculateDivination(method, input);
        setResult({type, ...divinationResult});
        setIsThinking(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">遇事不决，相信科学</h1>
                    <SponsorButton/>
                </div>
                <DivinationForm onSubmit={handleDivination}/>
                {result && <DivinationResult result={result} isThinking={isThinking}/>}
            </div>
        </div>
    );
};

export default Page;
