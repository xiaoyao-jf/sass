const faqs = [
  {
    id: 1,
    question: "AI生成的爽文质量如何？",
    answer:
      "我们使用的是DeepSeek AI模型，它在中文创作方面表现出色。AI能够理解爽文的特有风格和套路，生成符合读者期待的高质量内容。每次生成都会根据您的输入进行个性化创作，确保内容的独特性和可读性。",
  },
  {
    id: 2,
    question: "支持哪些类型的爽文题材？",
    answer:
      "平台支持多种热门爽文题材，包括但不限于：重生逆袭、霸道总裁、都市修仙、末世求生、穿越古代、系统流等。您只需要提供角色名称和基本设定，AI就能为您生成相应题材的精彩内容。",
  },
  {
    id: 3,
    question: "新用户如何开始使用？",
    answer:
      "非常简单！只需要注册账户并登录，然后在主页找到\"重生之老板是我小秘\"功能模块。输入老板姓名和故事题目，点击生成按钮即可。新用户通常可以免费体验几次生成功能。",
  },
  {
    id: 4,
    question: "生成一篇爽文需要多长时间？",
    answer:
      "AI生成速度非常快，通常在10-30秒内就能完成一篇800-1200字的爽文内容。具体时间可能因网络状况和服务器负载而有所变化，但我们始终致力于为用户提供最快的创作体验。",
  },
  {
    id: 5,
    question: "积分和订阅套餐有什么区别？",
    answer:
      "积分适合偶尔使用的用户，按次付费，用完即止。订阅套餐适合经常创作的用户，按月付费，享受无限次数生成和优先处理。订阅用户还可以享受更多高级功能和定制选项。",
  },
  {
    id: 6,
    question: "生成的内容版权归谁所有？",
    answer:
      "AI生成的内容版权归用户所有。您可以自由使用、修改和分发生成的内容。我们不会保存您的创作内容，也不会将其用于其他目的。我们致力于保护用户的创作权益和隐私安全。",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">常见问题解答</h2>
        <dl className="mt-20 divide-y divide-foreground/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-foreground lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 