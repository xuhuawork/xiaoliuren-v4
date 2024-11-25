"use client";

import React, { useState } from 'react';
import DivinationForm from './components/DivinationForm';
import DivinationResult from './components/DivinationResult';
import SponsorButton from './components/SponsorButton';
import {calculateDivination} from './utils/divinationLogic';
import {DivinationType, DivinationMethod, DivinationResult as ResultType} from './types';

const Page: React.FC = () => {
    const [result, setResult] = useState<ResultType | null>(null);

    const handleDivination = (type: DivinationType, method: DivinationMethod, input: number[] | Date) => {
        const divinationResult = calculateDivination(method, input);
        setResult({type, ...divinationResult});
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">序桦老师相信科学模拟器</h1>
                    <SponsorButton/>
                </div>
                <DivinationForm onSubmit={handleDivination}/>
                {result && <DivinationResult result={result}/>}
            </div>
        </div>
    );
};

export default Page;
