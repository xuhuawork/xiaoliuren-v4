import React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'

const SponsorButton: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">赞助序桦</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>赞助序桦老师</DialogTitle>
          <DialogDescription>
            感谢您的支持！您的赞助将帮助我们提供更好的服务。
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 my-4">
            <img
              src="/wechat-qr.jpg"
              alt="微信收款码"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            请使用微信扫描二维码进行赞助
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>赞助后可获得以下特权：</p>
          <ul className="text-left list-disc list-inside mt-2">
            <li>无限次数的占卜服务</li>
            <li>更详细的解卦分析</li>
            <li>优先的技术支持</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorButton;