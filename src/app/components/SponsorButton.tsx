"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SponsorButton: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handlePayment = () => {
    setIsPaymentProcessing(true);
    // 这里应该是调用后端API的地方
    setTimeout(() => {
      setIsPaymentProcessing(false);
      alert('感谢您的赞助！');
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">赞助序桦</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>赞助序桦老师</DialogTitle>
          <DialogDescription>
            您的支持是我们继续提供服务的动力。请选择赞助金额。
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              金额
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              placeholder="请输入赞助金额"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePayment} disabled={isPaymentProcessing}>
            {isPaymentProcessing ? '处理中...' : '使用微信支付'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorButton;
