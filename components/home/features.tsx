'use client'

import { Sparkles, Zap, Brain, Shield } from 'lucide-react'

const features = [
  {
    name: 'AI智能创作',
    description:
      '基于DeepSeek AI模型，理解您的创作意图，生成符合爽文风格的高质量内容。从角色设定到情节发展，AI都能为您量身定制。',
    icon: Brain,
  },
  {
    name: '极速生成',
    description:
      '告别写作瓶颈！只需输入简单的角色名称和题材，AI即可在几秒钟内为您生成精彩的爽文片段，创作效率提升百倍。',
    icon: Zap,
  },
  {
    name: '多元题材',
    description:
      '涵盖重生逆袭、霸道总裁、都市修仙、末世求生等热门题材。无论您偏爱哪种风格，AI都能为您提供个性化的创作体验。',
    icon: Sparkles,
  },
  {
    name: '安全保障',
    description:
      '完善的用户认证系统和数据加密保护，确保您的创作内容和个人信息安全。支持订阅管理和积分系统，灵活的使用方式。',
    icon: Shield,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">AI创作平台</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            释放创意潜能，畅享AI写作乐趣
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            我们的AI爽文平台为创作者提供强大的智能写作工具。无论您是新手还是资深作者，
            都能通过AI的力量快速创作出令人惊艳的爽文内容，让创意不再受限。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-primary-foreground" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
