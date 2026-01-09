import project1 from '@/assets/project-1.jpg';

export interface BlogPost {
  id: string;
  title: string;
  titleKo: string;
  date: string;
  dateKo: string;
  category: string;
  categoryKo: string;
  content: string;
  contentKo: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'startup-from-zero',
    title: 'Starting a Humble Startup from Zero',
    titleKo: '준비 Zero로 시작한 초라한 창업',
    date: 'Jan 9, 2025',
    dateKo: '2025년 1월 9일',
    category: 'Category1',
    categoryKo: '카테고리1',
    content: `# Starting a Humble Startup from Zero

![Blog Image](${project1})

Starting a business without any preparation might sound crazy, but sometimes the best time to start is right now.

## The Beginning

When I decided to start my own company, I had nothing but an idea and determination. No funding, no team, no office - just a laptop and a dream.

## Lessons Learned

The journey has been challenging but incredibly rewarding. Here are some key takeaways:

1. **Start before you're ready** - Perfection is the enemy of progress
2. **Learn as you go** - Every mistake is a lesson
3. **Stay humble** - The market will teach you what you need to know

## Looking Forward

As we continue to grow, I'm grateful for every challenge that has shaped us into what we are today.`,
    contentKo: `# 준비 Zero로 시작한 초라한 창업

![블로그 이미지](${project1})

아무 준비 없이 사업을 시작한다는 건 미친 소리처럼 들릴 수 있지만, 때로는 시작하기 가장 좋은 때는 바로 지금입니다.

## 시작

내가 회사를 시작하기로 결정했을 때, 나에겐 아이디어와 결심밖에 없었습니다. 자금도, 팀도, 사무실도 없이 - 노트북과 꿈만 있었어요.

## 배운 것들

여정은 힘들었지만 믿을 수 없을 정도로 보람찼습니다. 핵심 교훈을 공유합니다:

1. **준비되기 전에 시작하라** - 완벽주의는 진보의 적이다
2. **하면서 배워라** - 모든 실수는 레슨이다
3. **겸손하라** - 시장이 필요한 것을 가르쳐줄 것이다

## 앞으로

성장하면서, 오늘의 우리를 만들어준 모든 도전에 감사합니다.`,
  },
  {
    id: 'building-in-10-minutes',
    title: "It Only Takes 10 Minutes to Build. But Who Will Pay?",
    titleKo: '만드는 건 이제 10분이면 끝. 근데 누가 돈 낼 건데?',
    date: 'Jan 9, 2025',
    dateKo: '2025년 1월 9일',
    category: 'Category1',
    categoryKo: '카테고리1',
    content: `# It Only Takes 10 Minutes to Build. But Who Will Pay?

The era of rapid prototyping is here. With AI tools and no-code platforms, building something has never been faster.

But here's the real question: in a world where anyone can build anything quickly, what actually matters?`,
    contentKo: `# 만드는 건 이제 10분이면 끝. 근데 누가 돈 낼 건데?

빠른 프로토타이핑의 시대가 왔습니다. AI 도구와 노코드 플랫폼으로 무언가를 만드는 것이 그 어느 때보다 빨라졌어요.

하지만 진짜 질문은 이겁니다: 누구나 빠르게 무엇이든 만들 수 있는 세상에서, 정말 중요한 것은 무엇일까요?`,
  },
  {
    id: 'data-driven-ads',
    title: "[Insights] Not Pretty Ads, But 'Selling' Ads: Data-Driven Planning and Production Methods",
    titleKo: "[인사이트 모음] 예쁜 광고가 아닌 '팔리는' 광고, 데이터 기반으로 기획하고 제작하는 방법",
    date: 'Jan 9, 2025',
    dateKo: '2025년 1월 9일',
    category: 'Category2',
    categoryKo: '카테고리2',
    content: `# Not Pretty Ads, But 'Selling' Ads

Data-driven advertising is transforming how we approach creative work.`,
    contentKo: `# 예쁜 광고가 아닌 '팔리는' 광고

데이터 기반 광고가 창작 작업 접근 방식을 변화시키고 있습니다.`,
  },
  {
    id: 'instagram-engagement',
    title: "Instagram Comment Event Operations and Insight Reports: This Is How It Changed",
    titleKo: '인스타그램 댓글 이벤트 운영과 인사이트 레포트, 이렇게 바뀌었습니다',
    date: 'Jan 9, 2025',
    dateKo: '2025년 1월 9일',
    category: 'Category2',
    categoryKo: '카테고리2',
    content: `# Instagram Comment Event Operations

A deep dive into how Instagram engagement strategies have evolved.`,
    contentKo: `# 인스타그램 댓글 이벤트 운영

인스타그램 참여 전략이 어떻게 발전했는지 심층 분석합니다.`,
  },
  {
    id: 'cost-optimization',
    title: "DIY vs Agency vs Platform Cost Comparison! Tips to Save 20% on Influencer Campaign Budget",
    titleKo: '직접 운영 vs 대행사 vs 플랫폼 비용 비교! 인스타 체험단 예산 20% 아끼는 최적화 팁',
    date: 'Jan 9, 2025',
    dateKo: '2025년 1월 9일',
    category: 'Category3',
    categoryKo: '카테고리3',
    content: `# Cost Optimization Tips

Comparing different approaches to influencer marketing and how to optimize your budget.`,
    contentKo: `# 비용 최적화 팁

인플루언서 마케팅에 대한 다양한 접근 방식을 비교하고 예산을 최적화하는 방법입니다.`,
  },
];

export const categories = [
  { id: 'all', name: 'All', nameKo: '전체' },
  { id: 'category1', name: 'Category1', nameKo: '카테고리1' },
  { id: 'category2', name: 'Category2', nameKo: '카테고리2' },
  { id: 'category3', name: 'Category3', nameKo: '카테고리3' },
];
