"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export function NovelGenerator() {
  const [bossName, setBossName] = useState("");
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsCheckingAuth(false);
    };

    checkUser();
  }, []);

  const handleGenerate = async () => {
    if (!user) {
      alert("请先登录后使用此功能");
      return;
    }

    if (!bossName.trim() || !topic.trim()) {
      alert("请填写完整的老板姓名和内容题目");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-novel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bossName: bossName.trim(),
          topic: topic.trim(),
        }),
      });

      if (response.status === 401) {
        alert("登录已过期，请重新登录");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "生成失败，请重试");
      }

      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error("生成错误:", error);
      alert(error instanceof Error ? error.message : "生成失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">检查登录状态...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            重生之老板是我小秘
          </CardTitle>
          <CardDescription>
            输入老板姓名和故事题目，AI 为您生成精彩爽文内容
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!user ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">需要登录才能使用</h3>
              <p className="text-muted-foreground mb-4">
                请登录您的账户以使用AI生成功能
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild>
                  <Link href="/sign-in">登录</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sign-up">注册</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bossName">老板姓名</Label>
                  <Input
                    id="bossName"
                    value={bossName}
                    onChange={(e) => setBossName(e.target.value)}
                    placeholder="请输入老板的姓名..."
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">故事题目</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="请输入爽文内容题目..."
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !bossName.trim() || !topic.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    正在生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    生成爽文
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {generatedContent && user && (
        <Card>
          <CardHeader>
            <CardTitle>生成的内容</CardTitle>
            <CardDescription>
              AI 为您生成的爽文内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={generatedContent}
              readOnly
              className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="生成的内容将显示在这里..."
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
} 