import OpenAI from "openai";

import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI(
    {
        // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
        apiKey: process.env.OPEN_AI_KEY,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, hexagrams } = req.body;

console.log('key', process.env.OPEN_AI_KEY);

  try {
    const completion = await openai.chat.completions.create({
      model: "qwen-turbo",
      messages: [
        { role: "system", content: "你是一个精通小六壬占卜的专家。" },
        { role: "user", content: `请用类似姜文导演的严肃口吻解释以下小六壬占卜结果，占卜类型为${type}：\n${hexagrams.map((h: any, i: number) => `${i + 1}. ${h.name}（${h.aspect}）：${h.description}`).join('\n')}` }
      ],
    });

    // const explanation = completion.choices?[0].message?.content;
    
    // console.log("explanation": explanation);

    console.log(completion.choices[0].message.content)


    
    res.status(200).json({ explanation: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Error generating explanation' });
  }
}

