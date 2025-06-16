'use client'

import { Sparkles, Zap, PenTool } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-background">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-background lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-muted-foreground ring-1 ring-border hover:ring-ring">
                    <Sparkles className="w-4 h-4 inline mr-2" />
                    AI驱动的创意写作平台{' '}
                    <a href="#features" className="font-semibold whitespace-nowrap text-primary">
                      <span aria-hidden="true" className="absolute inset-0" />
                      了解更多 <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-foreground sm:text-7xl">
                  AI<span className="text-primary">爽文</span>创作
                  <br />
                  <span className="text-primary">想象无界</span>
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                  释放AI的创作力量，只需几个关键词，即可生成精彩纷呈的爽文内容。
                  从重生逆袭到霸道总裁，让AI为您打造专属的爽文世界。
                </p>
                
                {/* 特色亮点 */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>10秒生成千字爽文</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PenTool className="w-4 h-4 text-primary" />
                    <span>多种题材随心选择</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>DeepSeek AI加持</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    开始创作
                  </Link>
                  <a href="#features" className="text-sm/6 font-semibold text-foreground">
                    查看功能 <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt="AI创作写作插画"
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1573&q=80"
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </div>
  )
}
