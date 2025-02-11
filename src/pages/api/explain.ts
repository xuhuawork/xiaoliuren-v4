import DeepSeek from "openai"; // 假设 DeepSeek 提供了类似的 SDK
import { NextApiRequest, NextApiResponse } from 'next';
import { rateLimit } from 'some-rate-limit-library';
import { z } from 'zod'; // 用于数据验证
import { prompts } from '../config/prompts';
import { logger } from '../utils/logger';
import { useState } from 'react';

const deepseek = new DeepSeek(
    {
        apiKey: process.env.DEEPSEEK_API_KEY, // 假设环境变量名为 DEEPSEEK_API_KEY
        baseURL: "https://api.deepseek.com/v1" // 假设 DeepSeek 的 API 基础 URL
    }
);

// 定义请求体的类型验证schema
const requestSchema = z.object({
  type: z.string().min(1).max(100),
  hexagrams: z.array(z.object({
    name: z.string(),
    description: z.string()
  })).min(1).max(3)
});

// 添加速率限制
const limiter = rateLimit({
  interval: 60 * 1000, // 1分钟
  uniqueTokenPerInterval: 500
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 验证API key
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('DEEPSEEK_API_KEY is not configured');
    }

    // 速率限制检查
    await limiter.check(res, 10, 'CACHE_TOKEN');

    // 请求方法验证
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // 数据验证
    const validatedData = requestSchema.parse(req.body);
    const { type, hexagrams } = validatedData;

    // 记录请求日志
    logger.info('Divination request', { type, hexagramCount: hexagrams.length });

    // 简化卦象信息，只保留名称和描述
    const hexagramsInfo = hexagrams
      .map((h: any, i: number) => 
        `${i + 1}. ${h.name}\n` +
        `   ${h.description}`
      )
      .join('\n\n');

    const prompt = `占卜主题：${type}\n\n` +
                  `卦象：\n${hexagramsInfo}`;

    // 设置超时
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });

    const completionPromise = deepseek.chat.completions.create({
      model: "deepseek-reasoner",
      messages: [
        { role: "system", content: prompts.systemPrompt },
        { role: "user", content: prompt }
      ],
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]);
    const explanation = completion.choices[0].message.content?.trim() || '';

    // 记录成功响应
    logger.info('Divination success', { type });

    res.status(200).json({ explanation });
  } catch (error) {
    logger.error('Divination error', { error });

    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: '输入参数格式错误' });
    }

    if (error.message === 'Request timeout') {
      return res.status(504).json({ message: '请求超时，请稍后重试' });
    }

    res.status(500).json({ 
      message: '系统暂时无法处理您的请求，请稍后重试'
    });
  }
}