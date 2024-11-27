import React, { useState } from 'react';
import { DivinationType, DivinationMethod } from '../types';
import { getTraditionalTimePeriod } from '../utils/divinationLogic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DivinationFormProps {
  onSubmit: (type: DivinationType, method: DivinationMethod, input: number[] | Date) => void;
}

const DivinationForm: React.FC<DivinationFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<DivinationType>('拍摄进展');
  const [method, setMethod] = useState<DivinationMethod>('manual');
  const [manualInput, setManualInput] = useState<string[]>(['', '', '']);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(new Date().toTimeString().split(' ')[0].slice(0, 5));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'manual') {
      if (manualInput.every(num => num !== '')) {
        onSubmit(type, method, manualInput.map(Number));
      } else {
        alert('请输入三个数字');
      }
    } else {
      const dateTime = new Date(`${date}T${time}`);
      onSubmit(type, method, dateTime);
    }
  };

  const handleRandomNumbers = () => {
    const randomNums = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100) + 1);
    setManualInput(randomNums.map(String));
  };

  const getTimePeriod = () => {
    const [hours] = time.split(':').map(Number);
    return getTraditionalTimePeriod(hours);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">序桦老师相信科学模拟器</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">选择占卜类型</Label>
            <Select value={type} onValueChange={(value) => setType(value as DivinationType)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="选择占卜类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="拍摄进展">拍摄进展</SelectItem>
                <SelectItem value="比稿情况">比稿情况</SelectItem>
                <SelectItem value="约会情况">约会情况</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">选择起卦方式</Label>
            <Select value={method} onValueChange={(value) => setMethod(value as DivinationMethod)}>
              <SelectTrigger id="method">
                <SelectValue placeholder="选择起卦方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">手动取数</SelectItem>
                <SelectItem value="time">时间起卦</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {method === 'manual' ? (
            <div className="space-y-2">
              <Label>输入三个数字</Label>
              <div className="flex justify-between space-x-2">
                {manualInput.map((num, index) => (
                  <Input
                    key={index}
                    type="number"
                    value={num}
                    onChange={(e) => {
                      const newInput = [...manualInput];
                      newInput[index] = e.target.value;
                      setManualInput(newInput);
                    }}
                    min="1"
                    max="100"
                    required
                    className="w-full"
                  />
                ))}
              </div>
              <Button type="button" onClick={handleRandomNumbers} variant="outline" className="w-full">
                随机取数
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="date">选择日期</Label>
                  <Input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="time">选择时间</Label>
                  <Input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">当前时辰：{getTimePeriod()}</p>
            </div>
          )}

          <Button type="submit" className="w-full">开挂解惑</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DivinationForm;

