import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const body = await request.json();
    const { bossName, topic } = body;

    if (!bossName || !topic) {
      return NextResponse.json(
        { error: "请提供老板姓名和故事题目" },
        { status: 400 }
      );
    }

    // 构建生成爽文的提示词
    const prompt = `请为我创作一个"重生之老板是我小秘"的爽文片段。要求：

角色设定：
- 老板名字：${bossName}
- 主角：重生的职场精英，现在成为${bossName}的秘书
- 故事背景：${topic}

故事要求：
1. 体现主角重生后的智慧和能力
2. 展现与老板${bossName}的互动
3. 情节要爽快，有反转
4. 字数控制在800-1200字
5. 语言风格活泼有趣，符合爽文特点

请开始创作：`;

    // 调用DeepSeek API
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.8,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API 错误: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || "生成失败，请重试";

    // 可选：记录使用历史到数据库
    // await logUsageHistory(user.id, "novel_generation", { bossName, topic });

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("生成小说错误:", error);
    return NextResponse.json(
      { error: "服务器内部错误，请重试" },
      { status: 500 }
    );
  }
} 