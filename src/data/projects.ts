import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';

export interface Project {
  id: string;
  number: string;
  title: string;
  titleKo: string;
  date: string;
  dateKo: string;
  thumbnail: string;
  content: string;
  contentKo: string;
}

export const projects: Project[] = [
  {
    id: 'editors-room',
    number: '03',
    title: "Publishing Editor Community 'Editors Room' Website Development",
    titleKo: "출판 편집자 커뮤니티 '에디터스 룸' 웹사이트 개발",
    date: '2026.05',
    dateKo: '2026년 5월',
    thumbnail: project1,
    content: `# Publishing Editor Community 'Editors Room' Website Development

![Project Image](${project1})

Leading the 'Editors Room' web development team or representing it as a new member, I believe in a structure where everyone has a strong sense of ownership, taking initiative in their work and delivering results. Just like every individual is the CEO of their own role.

So how can a company systematically create an environment where each team member has a powerful sense of ownership? There's a concept called DRI (Directly Responsible Individual). This term was coined by Apple. Steve Jobs wrote the DRI concept to clarify who is responsible for each task. Jobs created this concept because of a question that arose.

"When executing strategy A in the marketing team, the results were worse than expected. Was it the final decision-maker, the team leader who approved the decision, that was wrong? Or was the strategy itself that the team developed flawed?"

Jobs looked at it this way:

"No, the final decision-maker in marketing is the person who knows marketing best, so why is someone who doesn't even know about marketing making the final marketing decision just because they're in a higher position?"

From then on, Jobs designed Apple so that the most specialized person in each specific task would be the manager and spread the DRI decision-making framework throughout the company.`,
    contentKo: `# 출판 편집자 커뮤니티 '에디터스 룸' 웹사이트 개발

![프로젝트 이미지](${project1})

출판 편집자 커뮤니티 '에디터스 룸' 웹사이트 개발팀을 이끌고 있는 리더 혹은 대표라면 새로 합류하는 사람들이 모두 적극적인 오너십을 바탕으로 일하며 결과를 내주길 바랄 겁니다. 마치 모두가 대표인 것처럼 일하는 조직이죠. 그러면 어떻게 회사가 시스템적으로 각 팀원이 강력한 오너십을 가지고 일하는 환경을 만들어줄 수 있을까요?

DRI(Directly Responsible Individual)이라는 개념이 있습니다. 이 용어를 '개념'화 하기 시작한 것은 애플입니다. 스티브 잡스가 업무의 책임자를 두기 위해 DRI 개념을 썼어요. 잡스가 이 개념을 만들게 된 계기는 이런 의문 때문이었습니다.

"마케팅 팀에서 A라는 전략을 도출하여 실행했는데 예상했던 것보다 결과가 많이 좋지 않았다. 전략의 최종 의사결정권을 해준 팀장이 잘못일까? 전략을 구상했던 팀원의 전략이 잘못된 것일까?"

잡스는 이렇게 봤다고 해요.

"아니, 마케팅의 최종 의사결정권자는 마케팅을 제일 잘하는 사람이 내려야지, 왜 마케팅에 대해서도 모르는 사람이 상위 직급이라는 이유로 마케팅 최종 의사결정을 하는 거지?"

그때부터 잡스는 애플에서 특정 업무에 관해 가장 전문적인 인력이 매니저가 되도록 설계하고, DRI라는 의사결정 프레임 워크를 사내에 전파했습니다.`,
  },
  {
    id: 'digital-garden',
    number: '02',
    title: 'Digital Garden Platform Development',
    titleKo: '디지털 가든 플랫폼 개발',
    date: '2026.03',
    dateKo: '2026년 3월',
    thumbnail: project2,
    content: `# Digital Garden Platform Development

![Project Image](${project2})

A platform that allows users to cultivate their own digital garden of knowledge, notes, and ideas. The concept of a digital garden represents a different approach to organizing information online—one that emphasizes growth, connection, and personal curation rather than chronological streams.`,
    contentKo: `# 디지털 가든 플랫폼 개발

![프로젝트 이미지](${project2})

사용자가 자신만의 지식, 노트, 아이디어의 디지털 정원을 가꿀 수 있는 플랫폼입니다. 디지털 가든의 개념은 온라인에서 정보를 정리하는 다른 접근 방식을 나타냅니다—시간순 스트림보다는 성장, 연결, 개인적인 큐레이션을 강조합니다.`,
  },
  {
    id: 'minimalist-timer',
    number: '01',
    title: 'Minimalist Timer App Design',
    titleKo: '미니멀리스트 타이머 앱 디자인',
    date: '2026.01',
    dateKo: '2026년 1월',
    thumbnail: project3,
    content: `# Minimalist Timer App Design

![Project Image](${project3})

A beautifully simple timer application focused on productivity and mindfulness. The design philosophy centers on removing distractions and providing just the essential functionality needed to help users stay focused.`,
    contentKo: `# 미니멀리스트 타이머 앱 디자인

![프로젝트 이미지](${project3})

생산성과 마음챙김에 중점을 둔 아름답고 심플한 타이머 앱입니다. 디자인 철학은 방해 요소를 제거하고 사용자가 집중하는 데 필요한 필수 기능만 제공하는 것에 중점을 둡니다.`,
  },
];
