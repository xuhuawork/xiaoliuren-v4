import { NextApiRequest, NextApiResponse } from 'next';
import DeepSeek from "openai";

const deepseek = new DeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://api.deepseek.com/v1"
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, hexagrams } = req.body;

    const prompt = `请解释以下小六壬占卜结果，占卜主题为：${type}

卦象详情：
${hexagrams.map((h: any, i: number) => 
  `${i + 1}. ${h.name}
  - 描述：${h.description}
  - 五行：${h.element}
  - 方位：${h.direction}
  - ${h.timeFactor || h.stage}
  - 吉凶：${h.fortune}`
).join('\n\n')}`;

    const completion = await deepseek.chat.completions.create({
      model: "deepseek-reasoner",
      messages: [
        { 
          role: "system", 
          content: `你是一位专业的小六壬占卜解释专家。请严格按照以下格式回复：

【简要分析】
用50字左右说明小六壬卦象含义和事件走向

【行动建议】
用50字左右给出1-2条具体可行的建议

【暖心话】
用一句话温和地鼓励求卦者（15字以内）

注意：请严格控制字数。用温和友善的语气。`
        },
        { 
          role: "user", 
          content: prompt
        }
      ],
    });

    const explanation = completion.choices[0].message.content?.trim() || '';
    res.status(200).json({ explanation });
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    res.status(500).json({ message: 'Error generating explanation' });
  }
}