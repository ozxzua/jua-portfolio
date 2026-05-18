/**
 * JUA OH — Portfolio v3 · "Correspondance"
 * Concept  : Vintage airmail aesthetic — Seoul → Paris → The World
 * Style    : Minimal, editorial, sophisticated (sashakurilenko.com inspired)
 * Features : KO / EN language toggle · Full experience · All social links
 *
 * ─── Fonts (add to index.html <head>) ────────────────────────────────────
 * <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Caveat:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import { Mail, BookOpen, Camera, ArrowUpRight, MapPin, Globe } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// BILINGUAL CONTENT
// ─────────────────────────────────────────────────────────────────

type Lang = "en" | "ko";

const t = {
  nav: {
    home:    { en: "Home",    ko: "홈" },
    about:   { en: "About",   ko: "소개" },
    work:    { en: "Work",    ko: "경험" },
    skills:  { en: "Skills",  ko: "스킬" },
    contact: { en: "Contact", ko: "연락" },
  },
  langToggle: { en: "한국어", ko: "English" },

  // ── Hero ──────────────────────────────────────────────────────
  hero: {
    postmark: { en: "SEOUL → PARIS → WORLD", ko: "서울 → 파리 → 세계" },
    heading1: { en: "Hello,",    ko: "Hello," },
    heading2: { en: "I'm Jua.",  ko: "I'm Jua." },
    sub: {
      en: "Trilingual communicator · Global content creator · Cultural bridge between Korea and the world.",
      ko: "한국어·영어·프랑스어 — 세 언어로 브랜드와 사람을 잇는 글로벌 콘텐츠 크리에이터.",
    },
    cta:   { en: "Send a letter →", ko: "연락하기 →" },
    stamp: { en: "DELIVERED",       ko: "전달됨" },
  },

  // ── About ─────────────────────────────────────────────────────
  about: {
    label:    { en: "ABOUT", ko: "소개" },
    heading1: { en: "A letter",       ko: "A letter" },
    heading2: { en: "to the world.",  ko: "to the world." },
    p1: {
      en: "I'm a trilingual communicator fluent in Korean, English, and French, studying French & EU Studies at Hankuk University of Foreign Studies with a minor in Business Administration. Languages have always been how I understand the world, and marketing is how I've learned to use that understanding.",
      ko: "한국어·영어·프랑스어로 세계와 직접 대화합니다. 언어를 도구로, 콘텐츠를 무기로 — 브랜드의 이야기를 기획하고 실행합니다.",
    },
    p2: {
      en: "In Fall 2025, I moved to Paris to study at INALCO, where living inside the language taught me more than any classroom could. That experience sharpened how I read audiences, craft messages, and navigate the gap between cultures. From running global ESG campaigns at LG to opening a new export market through KOTRA, I build ideas that reach people across borders.",
      ko: "LG 글로벌 ESG 캠페인부터 KOTRA 수출 마케팅, 학과 굿즈 완판까지 — 아이디어를 실제 결과물로 만들어온 실행력 있는 크리에이터입니다.",
    },
    educationLabel: { en: "Education", ko: "학력" },
    edu: [
      {
        period: { en: "Mar 2024 – Feb 2028 (expected)", ko: "2024.03 – 2028.02 (예정)" },
        school: { en: "Hankuk University of Foreign Studies", ko: "한국외국어대학교" },
        detail: { en: "B.A. French & EU Studies · Minor in Business Administration · GPA 3.8 / 4.5", ko: "프랑스·EU전공 / 경영학 부전공" },
        city: "Seoul",
        color: "#C4452A",
      },
      {
        period: { en: "Sep – Dec 2025", ko: "2025.09 – 2025.12" },
        school: { en: "Institut National des Langues et Civilisations Orientales", ko: "국립동양언어문화연구소 (INALCO)" },
        detail: { en: "Exchange Program · Paris, France", ko: "교환학생 프로그램 · 프랑스 파리" },
        city: "Paris",
        color: "#5B6FA6",
      },
    ],
    langLabel: { en: "Languages", ko: "언어" },
    langs: [
      { name: { en: "Korean",   ko: "한국어" }, note: { en: "Native",      ko: "원어민" },      flag: "🇰🇷" },
      { name: { en: "English",  ko: "영어" },   note: { en: "TOEIC 955",   ko: "TOEIC 955" },   flag: "🇺🇸" },
      { name: { en: "French",   ko: "프랑스어" }, note: { en: "B1 · INALCO", ko: "B1 · INALCO" }, flag: "🇫🇷" },
    ],
  },

  // ── Work ──────────────────────────────────────────────────────
  work: {
    label:    { en: "WORK",            ko: "경험" },
    heading1: { en: "Postmarks from",  ko: "Postmarks from" },
    heading2: { en: "every city.",     ko: "every city." },
    relevantLabel:  { en: "Relevant Experience",    ko: "관련 경험" },
    extraLabel:     { en: "Extracurricular",         ko: "과외 활동" },
    experience: [
      {
        period:  { en: "Feb 2026 – Present", ko: "2026.02 – 현재" },
        role:    { en: "Part-time Café Staff", ko: "카페 파트타이머" },
        company: "Les Mains Dorées",
        city:    "Seoul",
        color:   "#C4452A",
        tag:     { en: "Hospitality · FR · EN", ko: "고객 서비스 · 커뮤니케이션" },
        points:  [
          {
            en: "Served 100+ international customers daily, providing personalised coffee recommendations in English and French.",
            ko: "일 평균 100명 이상의 외국인 고객을 응대하며 영어·프랑스어를 활용한 맞춤형 추천으로 재방문 사례 증가에 기여",
          },
          {
            en: "Earned positive manager feedback for attentive service that encouraged repeat visits from international guests.",
            ko: "외국인 고객의 반복 문의와 선호를 반영한 응대 포인트를 제안해 고객 커뮤니케이션 개선에 기여",
          },
          {
            en: "Tracked item sell-out patterns in Excel to support restocking decisions and customer inquiries.",
            ko: "Excel을 활용해 품목별 판매 및 품절 패턴을 정리하고 재고 문의 응대 지원",
          },
        ],
        category: "relevant",
      },
      {
        period:  { en: "Apr 2025 – Nov 2025", ko: "2025.04 – 2025.11" },
        role:    { en: "Global Ambassador (Betterleaders)", ko: "글로벌 앰버서더 / Betterleaders" },
        company: "LG Energy Solution",
        city:    "Seoul",
        color:   "#4A7C59",
        tag:     { en: "Content · Sustainability", ko: "콘텐츠 · 지속가능성" },
        points:  [
          {
            en: "Created Instagram, Reels, card news, and YouTube content for global sustainability campaigns.",
            ko: "글로벌 지속가능성 캠페인을 위한 Instagram Reels, 카드뉴스, YouTube 콘텐츠 기획 및 제작",
          },
          {
            en: "Coordinated an Instagram Reels collaboration with 6 participants across the U.S., Europe, and Asia.",
            ko: "미국·유럽·아시아 참여자 6인과 Instagram Reels 기획하고, 참여자별 일정 및 콘텐츠 방향 조율",
          },
          {
            en: "Won the Outstanding Project Award for sustainability-focused video content on Korea's resource circulation policies.",
            ko: "한국 자원순환 정책을 주제로 한 영상 콘텐츠 제작, 우수 프로젝트 선정 및 서울새활용플라자 공식 유튜브 활용 요청 수신",
          },
        ],
        category: "relevant",
      },
      {
        id:      "kotra",
        period:  { en: "Apr 2025 – Jun 2025", ko: "2025.04 – 2025.06" },
        role:    { en: "Digital Trade Trainee", ko: "디지털 무역인력 deXters" },
        company: "KOTRA deXters Digital Trade Program",
        city:    "Seoul",
        color:   "#5B6FA6",
        tag:     { en: "Digital Marketing · B2B", ko: "디지털 마케팅 · B2B" },
        points:  [
          {
            en: "Researched target countries and distribution channels for a Korean beverage brand's overseas market entry.",
            ko: "한국 건강음료 브랜드의 해외 시장 진출을 위해 타깃 국가 및 유통 채널 리서치 수행",
          },
          {
            en: "Sent cold-emails to 50+ overseas distributors and secured interest from a German buyer.",
            ko: "50개 이상 해외 유통사를 대상으로 콜드메일을 발송하고, 독일 바이어의 관심 응답 확보",
          },
          {
            en: "Planned B2B marketing strategy and promotional content based on product features and target consumers.",
            ko: "제품 특성과 타깃 소비자를 고려한 B2B 마케팅 전략 및 홍보 콘텐츠 기획",
          },
          {
            en: '"Hi To Me, Healthier ME!" slogan proposed and selected as the official advertising copy.',
            ko: '"Hi To Me, Healthier ME!" 슬로건 제안, 공식 광고 콘텐츠 문구로 선정',
          },
        ],
        category: "relevant",
      },
      {
        id:      "council",
        period:  { en: "Jan 2024 – Dec 2025", ko: "2024.01 – 2025.12" },
        role:    { en: "PR Member", ko: "홍보부원" },
        company: { en: "Department Student Council", ko: "프랑스어학부 학생회" },
        city:    "Seoul",
        color:   "#C9A462",
        tag:     { en: "PR · Event Operations", ko: "홍보 · 행사 운영" },
        points:  [
          {
            en: "Created card news, posters and content for department events; managed the department SNS account.",
            ko: "학과 행사 홍보를 위한 카드뉴스, 포스터 및 안내 콘텐츠 제작 및 학과 SNS 계정 운영 관리",
          },
          {
            en: "Coordinated festival booth operations including promotional materials, visitor guidance, and on-site activities.",
            ko: "학과 축제 부스 운영을 위한 홍보물 준비, 방문자 안내 및 현장 프로그램 운영",
          },
          {
            en: "Designed department merchandise and managed vendor production — achieved a complete sell-out.",
            ko: "학과 굿즈 디자인 및 제작 업체 커뮤니케이션을 담당하고 제작 물량 전량 판매 달성",
          },
        ],
        category: "extra",
      },
      {
        period:  { en: "Jan 2024 – Jul 2025", ko: "2024.01 – 2025.07" },
        role:    { en: "English Tutor", ko: "영어 튜터" },
        company: "Jaranda",
        city:    "Seoul",
        color:   "#8B7355",
        tag:     { en: "Education · Tutoring", ko: "교육 · 튜터링" },
        points:  [
          {
            en: "Tailored English lessons to individual student goals and learning pace, earning parent referrals for two additional students.",
            ko: "학생별 목표와 학습 속도에 맞춰 영어 수업을 맞춤 설계하여 학부모 추천으로 추가 학생 2명 연결",
          },
          {
            en: "Increased an elementary student's AR reading level by one stage within two months through customised learning strategies.",
            ko: "맞춤형 학습 전략으로 초등학생의 AR 독서 레벨을 두 달 만에 한 단계 향상",
          },
        ],
        category: "extra",
      },
    ],
  },

  // ── Skills ────────────────────────────────────────────────────
  skills: {
    label:    { en: "SKILLS",        ko: "역량" },
    heading1: { en: "The tools",     ko: "The tools" },
    heading2: { en: "I write with.", ko: "I write with." },
    langLabel:  { en: "Languages",        ko: "언어" },
    techLabel:  { en: "Technical Skills", ko: "기술 역량" },
    certLabel:  { en: "Certification",    ko: "자격증" },
    skills: [
      { name: { en: "Korean",   ko: "한국어" }, pct: 100, note: { en: "Native",      ko: "원어민" },      color: "#C4452A" },
      { name: { en: "English",  ko: "영어" },   pct: 95,  note: { en: "TOEIC 955",   ko: "TOEIC 955" },   color: "#5B6FA6" },
      { name: { en: "French",   ko: "프랑스어" }, pct: 60,  note: { en: "B1 · INALCO", ko: "B1 · INALCO" }, color: "#C9A462" },
    ],
    tech: [
      { name: { en: "Content Creation",  ko: "콘텐츠 제작" },  note: { en: "Instagram · YouTube · Reels · Card News", ko: "인스타그램 · 유튜브 · 릴스 · 카드뉴스" }, icon: "✦" },
      { name: { en: "Digital Marketing", ko: "디지털 마케팅" }, note: { en: "Campaigns · B2B Strategy",    ko: "캠페인 · B2B 전략" },          icon: "✦" },
      { name: { en: "MS Office", ko: "MS Office" }, note: { en: "Word · Excel · PowerPoint", ko: "Word · Excel · PowerPoint" }, icon: "✦" },
      { name: { en: "Figma", ko: "Figma" }, note: { en: "", ko: "" }, icon: "✦" },
      { name: { en: "Cross-cultural Communication", ko: "다문화 커뮤니케이션" }, note: { en: "Korea · Europe · Global", ko: "한국 · 유럽 · 글로벌" }, icon: "✦" },
    ],
    cert: {
      name:   { en: "Google Analytics Certified",   ko: "구글 애널리틱스 자격증" },
      detail: { en: "Digital Marketing · Web Analytics", ko: "디지털 마케팅 · 웹 애널리틱스" },
    },
  },

  // ── Contact ───────────────────────────────────────────────────
  contact: {
    label:    { en: "CONTACT",              ko: "연락" },
    heading1: { en: "Send me",              ko: "Send me" },
    heading2: { en: "a letter.",            ko: "a letter." },
    sub: {
      en: "Whether it's a collaboration, an opportunity, or simply a conversation — my inbox is always open.",
      ko: "협업, 기회, 혹은 간단한 대화라도 — 언제든지 환영합니다.",
    },
    cta:      { en: "Write to me",          ko: "메일 보내기" },
    stamped:  { en: "DELIVERED TO JUA OH", ko: "오주아에게 전달됨" },
  },

  galleries: {
    kotra: {
      from: "FROM · KOTRA DEXTERS · SEOUL, 2025",
      title: "Hi To Me, Healthier ME!",
      postmark: "KOTRA · 2025",
      images: [
        { src: "/images/kotra-ad1.png",  caption: "CAMPAIGN VISUAL · BRAND AD",                    isPhone: false },
        { src: "/images/kotra-ad2.png",  caption: "PRODUCT CAMPAIGN · PACKAGING VISUAL",           isPhone: false },
        { src: "/images/kotra-live.png", caption: "ACTUAL LANDING PAGE · LIVE B2B PRODUCT LISTING PAGE", isPhone: true  },
      ],
    },
    council: {
      from: "FROM · HUFS FRENCH DEPT · SEOUL, 2024",
      title: "Goods & Clothes — 1st Drop",
      postmark: "HUFS · 2024",
      images: [
        { src: "/images/goods-clothes.png", caption: "GOODS & CLOTHES · DEPT MERCHANDISE DESIGN", isPhone: false },
      ],
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Caveat:wght@400;600&family=DM+Sans:wght@300;400;500&family=Noto+Serif+KR:wght@300;400;600&family=Noto+Sans+KR:wght@300;400;500&family=Nanum+Myeongjo:wght@400;700&display=swap');

  :root {
    --paper:   #F5F0E8;
    --paper2:  #EDE8DD;
    --ink:     #1A1410;
    --ink2:    #5C5448;
    --red:     #C4452A;
    --blue:    #5B6FA6;
    --gold:    #C9A462;
    --sage:    #4A7C59;
    --border:  #D6CFBF;
    --white:   #FDFCF9;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Fonts ── */
  .f-serif   { font-family: 'Cormorant Garamond', serif; }
  .f-hand    { font-family: 'Caveat', cursive; }
  .f-sans    { font-family: 'DM Sans', sans-serif; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar       { width: 3px; }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }

  /* ─────────────────────────────────────────────
     한국어 타이포그래피 오버라이드
     Korean typography — activated by [data-lang="ko"] on <html>
  ───────────────────────────────────────────── */

  /* 기본 폰트 교체: 한국어 최적화 세리프 + 산세리프 */
  [data-lang="ko"] body,
  [data-lang="ko"] .f-sans { font-family: 'Noto Sans KR', sans-serif; }

  [data-lang="ko"] .f-serif { font-family: 'Noto Serif KR', serif; font-style: normal !important; }

  /* 한글 손글씨 폰트 */
  [data-lang="ko"] .f-hand  { font-family: 'Nanum Myeongjo', serif; font-weight: 700; }

  /* 한국어 자간: 라틴 자간 초기화 (한글에 letter-spacing 과하면 어색) */
  [data-lang="ko"] h1,
  [data-lang="ko"] h2,
  [data-lang="ko"] h3,
  [data-lang="ko"] p,
  [data-lang="ko"] li,
  [data-lang="ko"] span,
  [data-lang="ko"] a  { letter-spacing: 0.02em; }

  /* 섹션 라벨 자간 — 한국어는 과도한 tracking 제거 */
  [data-lang="ko"] .section-label { letter-spacing: 0.08em; font-size: 11px; }

  /* 본문 행간 — 한국어는 더 넉넉하게 */
  [data-lang="ko"] p   { line-height: 2; }
  [data-lang="ko"] li  { line-height: 1.9; }

  /* 한국어 줄바꿈: 단어 단위 유지 */
  [data-lang="ko"] * { word-break: keep-all; }

  /* 헤딩 크기 미세 조정 — 한글은 같은 폰트 크기에서 더 크게 보임 */
  [data-lang="ko"] h1 { font-size: clamp(3.5rem, 11vw, 10rem) !important; font-weight: 300; }
  [data-lang="ko"] h2 { font-size: clamp(1.9rem, 4.2vw, 3.4rem) !important; font-weight: 300; }

  /* 네비게이션 한국어: 자간·크기 조정 */
  [data-lang="ko"] .nav-a { letter-spacing: 0.04em; font-size: 13px; }

  /* 버튼 안 한국어 텍스트 자간 */
  [data-lang="ko"] .btn-kr { letter-spacing: 0.04em; font-family: 'Noto Sans KR', sans-serif; }

  /* 티커 한국어 */
  [data-lang="ko"] .ticker-item { letter-spacing: 0.06em; font-family: 'Noto Sans KR', sans-serif; }

  /* 통계 숫자는 폰트 유지 (숫자는 라틴 폰트가 더 예쁨) */
  [data-lang="ko"] .stat-num { font-family: 'Cormorant Garamond', serif !important; letter-spacing: -0.01em; }

  /* 경험 카드 회사명 */
  [data-lang="ko"] .exp-company { font-family: 'Noto Sans KR', sans-serif; font-size: 13px; font-weight: 500; }

  /* 스킬 바 레이블 */
  [data-lang="ko"] .skill-name { font-family: 'Noto Sans KR', sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 0.02em; }

  /* 태그/배지 */
  [data-lang="ko"] .tag-pill  { font-family: 'Noto Sans KR', sans-serif; letter-spacing: 0.03em; font-size: 10px; }

  /* 소인 손글씨 크기 보정 */
  [data-lang="ko"] .postmark-text { font-size: 8px; letter-spacing: 0.06em; }

  /* Footer 자간 */
  [data-lang="ko"] .footer-text { letter-spacing: 0.04em; font-family: 'Noto Sans KR', sans-serif; }

  /* ── Page-load reveal ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .init { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
  .d1 { animation-delay: 0.05s; }
  .d2 { animation-delay: 0.15s; }
  .d3 { animation-delay: 0.28s; }
  .d4 { animation-delay: 0.42s; }
  .d5 { animation-delay: 0.58s; }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                transform 0.8s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: none; }

  /* ── Hover ── */
  .hover-red:hover { color: var(--red) !important; }

  /* ── Airmail stripe ── */
  .airmail-stripe {
    background: repeating-linear-gradient(
      -45deg,
      var(--red) 0px, var(--red) 4px,
      var(--white) 4px, var(--white) 12px,
      #1a3a8a 12px, #1a3a8a 16px,
      var(--white) 16px, var(--white) 24px
    );
    height: 6px;
    width: 100%;
  }

  /* ── Postmark circle ── */
  .postmark {
    width: 80px; height: 80px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    position: relative;
    opacity: 0.45;
  }
  .postmark::before {
    content: '';
    position: absolute;
    top: 50%; left: -12px; right: -12px;
    height: 2px;
    background: currentColor;
  }

  /* ── Stamp border ── */
  .stamp {
    border: 2px solid var(--border);
    position: relative;
    background: var(--white);
    padding: 20px;
  }
  .stamp::before {
    content: '';
    position: absolute;
    inset: -6px;
    background:
      radial-gradient(circle at 0 0,    var(--paper) 5px, transparent 5px),
      radial-gradient(circle at 100% 0,  var(--paper) 5px, transparent 5px),
      radial-gradient(circle at 0 100%,  var(--paper) 5px, transparent 5px),
      radial-gradient(circle at 100% 100%, var(--paper) 5px, transparent 5px);
  }

  /* ── Dashed envelope divider ── */
  .env-divider {
    border: none;
    border-top: 1.5px dashed var(--border);
    margin: 0;
  }

  /* ── Nav underline ── */
  .nav-a {
    position: relative;
    text-decoration: none;
    color: var(--ink2);
    font-size: 12px;
    letter-spacing: 0.1em;
    font-weight: 400;
    transition: color 0.2s;
  }
  .nav-a::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 100%;
    height: 1px;
    background: var(--red);
    transition: right 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-a:hover { color: var(--ink); }
  .nav-a:hover::after { right: 0; }

  /* ── Experience card ── */
  .exp-card {
    border-left: 2px solid var(--border);
    padding-left: 24px;
    position: relative;
  }
  .exp-card::before {
    content: '';
    position: absolute;
    left: -5px; top: 6px;
    width: 8px; height: 8px;
    border-radius: 50%;
    border: 2px solid var(--red);
    background: var(--paper);
  }

  /* ── Skill bar ── */
  .skill-track {
    height: 2px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }
  .skill-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 1.4s cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Section label ── */
  .section-label {
    font-size: 10px;
    letter-spacing: 0.3em;
    font-weight: 500;
    color: var(--red);
    text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Responsive hide nav ── */
  @media (max-width: 640px) {
    .desktop-nav { display: none !important; }
    .hero-postmarks { display: none !important; }
  }

  /* ── Lang toggle ── */
  .lang-btn {
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--ink2);
    background: none;
    border: 1px solid var(--border);
    border-radius: 99px;
    padding: 4px 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .lang-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── 3D Spinning Globe ── */
  @keyframes globeLong {
    0%   { transform: scaleX(1);     opacity: 0.75; }
    25%  { transform: scaleX(0.5);   opacity: 0.5;  }
    50%  { transform: scaleX(0.02);  opacity: 0.12; }
    75%  { transform: scaleX(-0.5);  opacity: 0.5;  }
    100% { transform: scaleX(-1);    opacity: 0.75; }
  }
  @keyframes globeLongB {
    0%   { transform: scaleX(-1);    opacity: 0.2;  }
    25%  { transform: scaleX(-0.5);  opacity: 0.15; }
    50%  { transform: scaleX(0.02);  opacity: 0.06; }
    75%  { transform: scaleX(0.5);   opacity: 0.15; }
    100% { transform: scaleX(1);     opacity: 0.2;  }
  }
  /* ── Postcard Gallery Modal ── */
  .pg-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(26,20,16,0.75);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: pgFadeIn 0.25s ease;
  }
  @keyframes pgFadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pgSlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }

  .pg-modal {
    background: var(--paper);
    width: 100%; max-width: 580px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: pgSlideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .pg-stripe {
    height: 7px;
    background: repeating-linear-gradient(
      -45deg,
      var(--red) 0px, var(--red) 5px,
      var(--paper) 5px, var(--paper) 12px,
      #3B5EA6 12px, #3B5EA6 17px,
      var(--paper) 17px, var(--paper) 24px
    );
  }
  .pg-body { padding: 24px 28px 20px; }
  .pg-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; }
  .pg-from { font-size:9px; letter-spacing:0.25em; color:var(--ink2); margin-bottom:4px; }
  .pg-title { font-size:15px; font-weight:500; color:var(--ink); }
  .pg-stamp-area { display:flex; flex-direction:column; align-items:flex-end; gap:6px; }
  .pg-stamp {
    width:50px; height:60px;
    background: var(--paper2); border:1px solid var(--border);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    font-size:7px; letter-spacing:0.1em; color:var(--ink2);
    position:relative; padding:4px;
  }
  .pg-stamp::before {
    content:''; position:absolute; inset:-5px;
    background:
      radial-gradient(circle at 0 0,    var(--paper) 4px, transparent 4px),
      radial-gradient(circle at 100% 0,  var(--paper) 4px, transparent 4px),
      radial-gradient(circle at 0 100%,  var(--paper) 4px, transparent 4px),
      radial-gradient(circle at 100% 100%, var(--paper) 4px, transparent 4px);
    pointer-events:none;
  }
  .pg-postmark {
    width:40px; height:40px; border-radius:50%;
    border:1.5px solid var(--red);
    display:flex; align-items:center; justify-content:center;
    font-size:7px; color:var(--red); text-align:center; line-height:1.3;
    letter-spacing:0.06em; opacity:0.45; position:relative;
  }
  .pg-postmark::before {
    content:''; position:absolute;
    top:50%; left:-8px; right:-8px; height:1.5px;
    background:var(--red);
  }
  .pg-img-frame {
    background:white; border:1px solid var(--border);
    padding:10px; margin-bottom:14px;
    box-shadow:2px 2px 0 var(--border);
  }
  .pg-img-main {
    width:100%;
    height:auto;
    max-height:420px;
    object-fit:contain;
    display:block;
    background: var(--paper2);
  }
  .pg-img-phone {
    display:flex; justify-content:center; align-items:center;
    padding: 24px 0;
    background: linear-gradient(160deg, #F8F4EE 0%, #EDE8DD 60%, #E2D9CC 100%);
    min-height: 320px;
  }
  .pg-phone-3d-wrap {
    display: flex;
    justify-content: center;
  }
  .pg-phone-frame {
    width: 130px;
    background: #1a1a1a;
    border-radius: 24px;
    padding: 10px 7px;
    position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }
  .pg-phone-notch {
    width: 38px; height: 6px;
    background: #0d0d0d;
    border-radius: 3px;
    margin: 0 auto 6px;
    position: relative;
  }
  .pg-phone-notch::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #1a1a1a;
    border: 1px solid #333;
  }
  .pg-phone-screen {
    border-radius: 16px;
    overflow: hidden;
    height: 220px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
  }
  .pg-phone-screen img { width:100%; height:100%; object-fit:cover; display:block; }
  /* Glow behind phone */
  .pg-phone-glow {
    position: absolute;
    width: 100px; height: 100px;
    background: radial-gradient(circle, rgba(196,69,42,0.25) 0%, transparent 70%);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .pg-caption { font-size:9px; text-align:center; color:var(--ink2); margin-top:8px; letter-spacing:0.12em; line-height:1.6; }
  .pg-nav { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .pg-nav-btn {
    width:30px; height:30px;
    border:1px solid var(--border); background:white;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; color:var(--ink2); font-size:13px;
    transition:all 0.2s;
  }
  .pg-nav-btn:hover { border-color:var(--red); color:var(--red); }
  .pg-count { font-size:9px; color:var(--ink2); letter-spacing:0.2em; }
  .pg-divider { border:none; border-top:1px dashed var(--border); margin:12px 0; }
  .pg-thumbs { display:flex; gap:6px; flex-wrap:wrap; }
  .pg-thumb {
    width:54px; height:54px;
    border:1.5px solid transparent;
    cursor:pointer; overflow:hidden;
    background:var(--paper2);
    transition:border-color 0.2s;
    position:relative; flex-shrink:0;
  }
  .pg-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
  .pg-thumb.active { border-color:var(--red); }
  .pg-thumb-label {
    position:absolute; bottom:0; left:0; right:0;
    background:rgba(26,20,16,0.6);
    font-size:7px; color:white; text-align:center;
    padding:2px; letter-spacing:0.06em;
  }
  .pg-close {
    position:absolute; top:14px; right:14px;
    width:26px; height:26px;
    border:1px solid rgba(255,255,255,0.25);
    background:rgba(26,20,16,0.4);
    color:white; display:flex; align-items:center; justify-content:center;
    cursor:pointer; font-size:12px; z-index:10;
    transition:background 0.2s;
  }
  .pg-close:hover { background:var(--red); border-color:var(--red); }
  .view-work-btn {
    display:inline-flex; align-items:center; gap:5px;
    font-size:10px; letter-spacing:0.15em; color:var(--red);
    background:none; border:none; cursor:pointer;
    padding:0; margin-top:14px;
    font-family:'DM Sans',sans-serif;
    transition:opacity 0.2s;
  }
  .view-work-btn:hover { opacity:0.7; }
  @media(max-width:640px) {
    .pg-body { padding:18px 18px 16px; }
    .pg-img-main { height:190px; }
  }`

// ─────────────────────────────────────────────────────────────────
// POSTCARD GALLERY MODAL
// ─────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  caption: string;
  isPhone?: boolean;
}

interface GalleryData {
  from: string;
  title: string;
  postmark: string;
  images: GalleryImage[];
}

function PostcardGallery({ data, onClose }: { data: GalleryData; onClose: () => void }) {
  const [cur, setCur] = useState(0);
  const total = data.images.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCur(c => (c + 1) % total);
      if (e.key === "ArrowLeft")  setCur(c => (c - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, total]);

  const img = data.images[cur];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="pg-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pg-modal">
        {/* Close */}
        <button className="pg-close" onClick={onClose}>✕</button>

        {/* Top airmail stripe */}
        <div className="pg-stripe" />

        <div className="pg-body">
          {/* Header */}
          <div className="pg-header">
            <div>
              <div className="pg-from">{data.from}</div>
              <div className="pg-title">{data.title}</div>
            </div>
            <div className="pg-stamp-area">
              {/* Stamp with mini globe SVG */}
              <div className="pg-stamp">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="11" stroke="#B8976A" strokeWidth="0.8"/>
                  <ellipse cx="15" cy="15" rx="11" ry="4.5" stroke="#B8976A" strokeWidth="0.6"/>
                  <ellipse cx="15" cy="15" rx="4.5" ry="11" stroke="#B8976A" strokeWidth="0.6"/>
                  <circle cx="19" cy="12" r="1.8" fill="#C4452A"/>
                  <circle cx="12" cy="11" r="1.8" fill="#3B5EA6"/>
                </svg>
                <span style={{ marginTop: 2 }}>GLOBAL</span>
              </div>
              {/* Postmark */}
              <div className="pg-postmark">
                {data.postmark.split("·").map((line, i) => (
                  <span key={i} style={{ display: "block" }}>{line.trim()}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Main image */}
          <div className="pg-img-frame">
            {img.isPhone ? (
              <div className="pg-img-phone">
                <div className="pg-phone-3d-wrap">
                  <div style={{ position: "relative" }}>
                    <div className="pg-phone-glow" />
                    <div className="pg-phone-frame">
                      {/* Side buttons */}
                      <div className="pg-phone-btn-r" />
                      <div className="pg-phone-btn-l1" />
                      <div className="pg-phone-btn-l2" />
                      {/* Notch */}
                      <div className="pg-phone-notch" />
                      {/* Screen */}
                      <div className="pg-phone-screen">
                        <img src={img.src} alt={img.caption} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <img src={img.src} alt={img.caption} className="pg-img-main" />
            )}
            <div className="pg-caption">
              {pad(cur + 1)} — {img.caption}
            </div>
          </div>

          {/* Nav */}
          {total > 1 && (
            <>
              <div className="pg-nav">
                <button className="pg-nav-btn" onClick={() => setCur(c => (c - 1 + total) % total)}>←</button>
                <span className="pg-count">{pad(cur + 1)} / {pad(total)}</span>
                <button className="pg-nav-btn" onClick={() => setCur(c => (c + 1) % total)}>→</button>
              </div>

              <hr className="pg-divider" />

              {/* Thumbnails */}
              <div className="pg-thumbs">
                {data.images.map((thumb, i) => (
                  <div key={i} className={`pg-thumb${cur === i ? " active" : ""}`} onClick={() => setCur(i)}>
                    {thumb.isPhone ? (
                      <div style={{ width: "100%", height: "100%", background: "#1A1410", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 16 }}>📱</span>
                      </div>
                    ) : (
                      <img src={thumb.src} alt={`thumb ${i + 1}`} />
                    )}
                    <div className="pg-thumb-label">{pad(i + 1)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom airmail stripe */}
        <div className="pg-stripe" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3D SPINNING GLOBE COMPONENT
// ─────────────────────────────────────────────────────────────────

function Globe3D({ size = 300, color = "rgba(196,69,42,0.7)" }: { size?: number; color?: string }) {
  const R = size / 2;
  const cx = R, cy = R;

  // Latitude lines: y offset and corresponding rx
  const latitudes = [-0.65, -0.45, -0.2, 0, 0.2, 0.45, 0.65];

  // Longitude lines: 6 front + 6 back (offset by half phase each)
  const longCount = 6;
  const dur = 10; // seconds per full rotation

  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size} height={size}
        style={{ overflow: "visible" }}
      >
        {/* Globe outline */}
        <circle
          cx={cx} cy={cy} r={R - 2}
          fill="none"
          stroke={color}
          strokeWidth={1}
          opacity={0.5}
        />

        {/* Clip to circle */}
        <defs>
          <clipPath id="globe-clip">
            <circle cx={cx} cy={cy} r={R - 2} />
          </clipPath>
        </defs>

        <g clipPath="url(#globe-clip)">
          {/* Latitude lines */}
          {latitudes.map((t, i) => {
            const yOff = t * (R - 2);
            const latRx = Math.sqrt(Math.max(0, (R - 2) ** 2 - yOff ** 2));
            const latRy = latRx * 0.22;
            return (
              <ellipse
                key={`lat-${i}`}
                cx={cx} cy={cy + yOff}
                rx={latRx} ry={latRy}
                fill="none"
                stroke={color}
                strokeWidth={0.8}
                opacity={0.35}
              />
            );
          })}

          {/* Longitude lines — front (animating scaleX) */}
          {Array.from({ length: longCount }).map((_, i) => {
            const delay = -(i * (dur / longCount));
            return (
              <ellipse
                key={`long-f-${i}`}
                cx={cx} cy={cy}
                rx={R - 2} ry={R - 2}
                fill="none"
                stroke={color}
                strokeWidth={0.9}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `globeLong ${dur}s linear ${delay}s infinite`,
                }}
              />
            );
          })}

          {/* Longitude lines — back (lower opacity, same animation offset by half) */}
          {Array.from({ length: longCount }).map((_, i) => {
            const delay = -(i * (dur / longCount));
            return (
              <ellipse
                key={`long-b-${i}`}
                cx={cx} cy={cy}
                rx={R - 2} ry={R - 2}
                fill="none"
                stroke={color}
                strokeWidth={0.6}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `globeLongB ${dur}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
        </g>

        {/* Seoul dot */}
        <circle
          cx={cx + (R - 2) * 0.55}
          cy={cy - (R - 2) * 0.32}
          r={3}
          fill={color}
          opacity={0.9}
          style={{ animation: "dotPulse 2.5s ease-in-out infinite" }}
        />
        {/* Seoul label */}
        <text
          x={cx + (R - 2) * 0.55 + 7}
          y={cy - (R - 2) * 0.32 + 4}
          fontSize={9}
          fill={color}
          opacity={0.7}
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.1em"
        >
          SEOUL
        </text>

        {/* Paris dot */}
        <circle
          cx={cx + (R - 2) * 0.1}
          cy={cy - (R - 2) * 0.42}
          r={3}
          fill={color}
          opacity={0.9}
          style={{ animation: "dotPulse 2.5s ease-in-out 1.2s infinite" }}
        />
        {/* Paris label */}
        <text
          x={cx + (R - 2) * 0.1 + 7}
          y={cy - (R - 2) * 0.42 + 4}
          fontSize={9}
          fill={color}
          opacity={0.7}
          fontFamily="'DM Sans', sans-serif"
          letterSpacing="0.1em"
        >
          PARIS
        </text>

        {/* Connecting arc between Seoul and Paris */}
        <path
          d={`M ${cx + (R - 2) * 0.1} ${cy - (R - 2) * 0.42}
              Q ${cx + (R - 2) * 0.35} ${cy - (R - 2) * 0.65}
                ${cx + (R - 2) * 0.55} ${cy - (R - 2) * 0.32}`}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          strokeDasharray="4 3"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("in"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function tx(obj: { en: string; ko: string } | string, lang: Lang): string {
  if (typeof obj === "string") return obj;
  return obj[lang];
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar({ lang, toggleLang }: { lang: Lang; toggleLang: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { key: "home",    href: "#home" },
    { key: "about",   href: "#about" },
    { key: "work",    href: "#work" },
    { key: "skills",  href: "#skills" },
    { key: "contact", href: "#contact" },
  ] as const;

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(245,240,232,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "0 clamp(1.5rem,5vw,3.5rem)",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="f-serif" style={{ fontSize: 18, fontWeight: 400, color: "var(--ink)", letterSpacing: "0.03em" }}>
            Jua Oh
          </span>
          <span className="f-hand" style={{ fontSize: 13, color: "var(--red)", opacity: 0.7 }}>오주아</span>
        </div>

        {/* Nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 28 }}>
          {navItems.map(({ key, href }) => (
            <a key={key} href={href} className="nav-a f-sans">
              {tx(t.nav[key], lang)}
            </a>
          ))}
        </nav>

        {/* Lang toggle */}
        <button className="lang-btn" onClick={toggleLang}>
          {tx(t.langToggle, lang)}
        </button>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function Hero({ lang }: { lang: Lang }) {
  const c = t.hero;
  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "var(--white)",
      display: "flex", flexDirection: "column",
      padding: "0 clamp(1.5rem,5vw,3.5rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top airmail stripe */}
      <div className="airmail-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      {/* Decorative postmarks — top right: Gwanghwamun / Eiffel / Globe infographics */}
      <div className="hero-postmarks" style={{
        position: "absolute", top: 72, right: "clamp(1.5rem,5vw,3.5rem)",
        display: "flex", gap: 20,
      }}>
        {/* Seoul — Gwanghwamun gate line art */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.45 }}>
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="34" r="32" stroke="var(--red)" strokeWidth="1.2" />
            {/* Gwanghwamun gate: base wall */}
            <rect x="14" y="42" width="40" height="8" rx="0.5" stroke="var(--red)" strokeWidth="1" />
            {/* Arch tunnel */}
            <path d="M26 42 L26 36 Q34 31 42 36 L42 42" stroke="var(--red)" strokeWidth="1" fill="none" />
            {/* First roof tier */}
            <path d="M18 42 L18 38 L50 38 L50 42" stroke="var(--red)" strokeWidth="0.8" fill="none" />
            <path d="M15 38 Q34 30 53 38" stroke="var(--red)" strokeWidth="1" fill="none" />
            {/* Second roof tier */}
            <path d="M20 33 L20 30 L48 30 L48 33" stroke="var(--red)" strokeWidth="0.8" fill="none" />
            <path d="M17 30 Q34 22 51 30" stroke="var(--red)" strokeWidth="1" fill="none" />
            {/* Roof ridge */}
            <line x1="34" y1="22" x2="34" y2="20" stroke="var(--red)" strokeWidth="0.8" />
            {/* Corner eaves */}
            <line x1="15" y1="38" x2="11" y2="41" stroke="var(--red)" strokeWidth="0.8" />
            <line x1="53" y1="38" x2="57" y2="41" stroke="var(--red)" strokeWidth="0.8" />
            <line x1="17" y1="30" x2="13" y2="33" stroke="var(--red)" strokeWidth="0.8" />
            <line x1="51" y1="30" x2="55" y2="33" stroke="var(--red)" strokeWidth="0.8" />
            {/* Windows on wall */}
            <rect x="19" y="43.5" width="6" height="5" rx="0.5" stroke="var(--red)" strokeWidth="0.7" />
            <rect x="43" y="43.5" width="6" height="5" rx="0.5" stroke="var(--red)" strokeWidth="0.7" />
          </svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "var(--red)" }}>SEOUL</span>
        </div>

        {/* Paris — Eiffel Tower line art */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.45 }}>
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="34" r="32" stroke="#5B6FA6" strokeWidth="1.2" />
            {/* Spire */}
            <line x1="34" y1="12" x2="34" y2="20" stroke="#5B6FA6" strokeWidth="1" />
            {/* Upper section */}
            <line x1="34" y1="12" x2="31" y2="20" stroke="#5B6FA6" strokeWidth="0.8" />
            <line x1="34" y1="12" x2="37" y2="20" stroke="#5B6FA6" strokeWidth="0.8" />
            <line x1="31" y1="20" x2="26" y2="32" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="37" y1="20" x2="42" y2="32" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="31" y1="20" x2="37" y2="20" stroke="#5B6FA6" strokeWidth="0.8" />
            <line x1="28" y1="26" x2="40" y2="26" stroke="#5B6FA6" strokeWidth="0.7" />
            {/* First platform */}
            <line x1="24" y1="32" x2="44" y2="32" stroke="#5B6FA6" strokeWidth="1" />
            {/* Mid section */}
            <line x1="26" y1="34" x2="19" y2="48" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="42" y1="34" x2="49" y2="48" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="24" y1="40" x2="44" y2="40" stroke="#5B6FA6" strokeWidth="0.7" />
            <path d="M26 34 Q34 38 42 34" stroke="#5B6FA6" strokeWidth="0.7" fill="none" />
            {/* Second platform */}
            <line x1="17" y1="48" x2="51" y2="48" stroke="#5B6FA6" strokeWidth="1" />
            {/* Legs */}
            <line x1="19" y1="50" x2="12" y2="58" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="49" y1="50" x2="56" y2="58" stroke="#5B6FA6" strokeWidth="1" />
            <line x1="24" y1="50" x2="20" y2="58" stroke="#5B6FA6" strokeWidth="0.8" />
            <line x1="44" y1="50" x2="48" y2="58" stroke="#5B6FA6" strokeWidth="0.8" />
            <line x1="19" y1="54" x2="49" y2="54" stroke="#5B6FA6" strokeWidth="0.7" />
            {/* Base */}
            <line x1="10" y1="58" x2="58" y2="58" stroke="#5B6FA6" strokeWidth="1" />
          </svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "#5B6FA6" }}>PARIS</span>
        </div>

        {/* World — Globe wire frame */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: 0.45 }}>
          <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34" cy="34" r="32" stroke="var(--ink)" strokeWidth="1.2" />
            {/* Inner globe */}
            <circle cx="34" cy="34" r="20" stroke="var(--ink)" strokeWidth="0.9" />
            {/* Latitude lines */}
            <ellipse cx="34" cy="34" rx="20" ry="7" stroke="var(--ink)" strokeWidth="0.7" />
            <ellipse cx="34" cy="27" rx="17" ry="5" stroke="var(--ink)" strokeWidth="0.6" />
            <ellipse cx="34" cy="41" rx="17" ry="5" stroke="var(--ink)" strokeWidth="0.6" />
            {/* Longitude lines */}
            <ellipse cx="34" cy="34" rx="8" ry="20" stroke="var(--ink)" strokeWidth="0.7" />
            <ellipse cx="34" cy="34" rx="15" ry="20" stroke="var(--ink)" strokeWidth="0.6" />
            {/* Seoul dot */}
            <circle cx="41" cy="29" r="2" fill="var(--red)" />
            {/* Paris dot */}
            <circle cx="31" cy="27" r="2" fill="#5B6FA6" />
            {/* Route */}
            <path d="M31 27 Q36 23 41 29" stroke="var(--ink)" strokeWidth="0.6" strokeDasharray="2 1.5" fill="none" />
          </svg>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 8, letterSpacing: "0.15em", color: "var(--ink)" }}>WORLD</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", maxWidth: 1280, margin: "0 auto", width: "100%",
        paddingTop: 80, paddingBottom: 60,
      }}>

        {/* Route line */}
        <div className="init d1" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <div style={{ width: 32, height: 1, background: "var(--red)" }} />
          <span className="f-hand" style={{ fontSize: 16, color: "var(--red)" }}>
            {tx(c.postmark, lang)}
          </span>
        </div>

        {/* Heading */}
        <h1 className="f-serif init d2" style={{
          fontSize: "clamp(4rem, 11vw, 10rem)",
          fontWeight: 300,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: 32,
        }}>
          {tx(c.heading1, lang)}<br />
          <em style={{ color: "var(--red)", fontStyle: "italic" }}>{tx(c.heading2, lang)}</em>
        </h1>

        {/* Sub */}
        <p className="f-sans init d3" style={{
          fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
          color: "var(--ink2)",
          fontWeight: 300,
          maxWidth: 520,
          lineHeight: 1.8,
          marginBottom: 44,
        }}>
          {tx(c.sub, lang)}
        </p>

        {/* CTA row */}
        <div className="init d4" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px",
              border: "1px solid var(--ink)",
              color: "var(--ink)",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "all 0.25s",
              background: "transparent",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--paper)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            {tx(c.cta, lang)}
          </a>

          {/* Socials */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: <Mail size={15} />,     href: "mailto:juaoh0424@gmail.com", label: "Email" },
              { icon: <Camera size={15} />,   href: "https://www.instagram.com/ozxzua/", label: "Instagram" },
              { icon: <BookOpen size={15} />, href: "https://blog.naver.com/ozxzua", label: "Blog" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                style={{
                  width: 40, height: 40,
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--ink2)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: "var(--white)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.color = "var(--red)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink2)"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom stamp */}
        <div className="init d5" style={{
          marginTop: 80,
          display: "flex", alignItems: "center", gap: 16,
          borderTop: "1px solid var(--border)", paddingTop: 28,
          maxWidth: 500,
        }}>
          {/* Wax-seal stamp */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            border: "2px solid var(--red)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span className="f-hand" style={{ fontSize: 8, color: "var(--red)", textAlign: "center", lineHeight: 1.3, letterSpacing: "0.05em" }}>
              {tx(c.stamp, lang)}
            </span>
          </div>
          <div>
            <p style={{ fontSize: 11, color: "var(--ink2)", letterSpacing: "0.08em" }}>
              {lang === "en"
                ? "Hankuk University of Foreign Studies · INALCO Paris"
                : "한국외국어대학교 · INALCO 파리"}
            </p>
            <p style={{ fontSize: 10, color: "var(--border)", marginTop: 3, letterSpacing: "0.06em" }}>
              {lang === "en" ? "GPA 3.8 · French & EU Studies · Business Administration" : "GPA 3.8 · 프랑스·EU학과 · 경영학 부전공"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom airmail stripe */}
      <div className="airmail-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About({ lang }: { lang: Lang }) {
  const c = t.about;
  return (
    <section id="about" style={{
      background: "var(--paper)",
      padding: "100px clamp(1.5rem,5vw,3.5rem)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Label */}
        <Reveal>
          <p className="section-label" style={{ marginBottom: 16 }}>{tx(c.label, lang)}</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(3rem,7vw,7rem)", alignItems: "start" }}>

          {/* Left text */}
          <div>
            <Reveal>
              <h2 className="f-serif" style={{
                fontSize: "clamp(2.2rem,5vw,4rem)",
                fontWeight: 300, lineHeight: 1.1,
                color: "var(--ink)", marginBottom: 28,
              }}>
                {tx(c.heading1, lang)}<br />
                <em style={{ color: "var(--red)" }}>{tx(c.heading2, lang)}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>
                {tx(c.p1, lang)}
              </p>
              <p style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.9, fontWeight: 300 }}>
                {tx(c.p2, lang)}
              </p>
            </Reveal>

            {/* Language flags */}
            <Reveal delay={0.18}>
              <div style={{ marginTop: 36 }}>
                <p className="section-label" style={{ marginBottom: 16 }}>{tx(c.langLabel, lang)}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {c.langs.map((l) => (
                    <div key={l.flag} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 16px",
                      border: "1px solid var(--border)",
                      background: "var(--white)",
                    }}>
                      <span style={{ fontSize: 16 }}>{l.flag}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{tx(l.name, lang)}</div>
                        <div style={{ fontSize: 10, color: "var(--ink2)" }}>{tx(l.note, lang)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right education */}
          <Reveal delay={0.15}>
            <p className="section-label" style={{ marginBottom: 20 }}>{tx(c.educationLabel, lang)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {c.edu.map((e, i) => (
                <div key={i}>
                  <div style={{ paddingBottom: 28 }}>
                    {/* City postmark */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        border: `1.5px solid ${e.color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                        opacity: 0.75,
                      }}>
                        <span className="f-hand" style={{ fontSize: 11, color: e.color, letterSpacing: "0.05em", textAlign: "center", lineHeight: 1.2 }}>
                          {e.city}
                        </span>
                      </div>
                      <span style={{ fontSize: 10, color: "var(--ink2)", letterSpacing: "0.15em" }}>
                        {tx(e.period, lang)}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>
                      {tx(e.school, lang)}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.6 }}>
                      {tx(e.detail, lang)}
                    </p>
                  </div>
                  {i < c.edu.length - 1 && <hr className="env-divider" style={{ marginBottom: 28 }} />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// WORK
// ─────────────────────────────────────────────────────────────────

function Work({ lang }: { lang: Lang }) {
  const c = t.work;
  const relevant = c.experience.filter(e => e.category === "relevant");
  const extra    = c.experience.filter(e => e.category === "extra");
  const [gallery, setGallery] = useState<null | typeof t.galleries.kotra>(null);

  const getGallery = (id: string) => {
    if (id === "kotra")   return t.galleries.kotra;
    if (id === "council") return t.galleries.council;
    return null;
  };

  const ExpGroup = ({ items, labelKey }: { items: typeof c.experience; labelKey: "relevantLabel" | "extraLabel" }) => (
    <div style={{ marginBottom: 64 }}>
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
          <p className="section-label">{tx(c[labelKey], lang)}</p>
          <div style={{ flex: 1, borderTop: "1px dashed var(--border)" }} />
        </div>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {items.map((exp, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="exp-card" style={{ borderLeftColor: exp.color }}>
              {/* Header row: role/company left | period right */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "var(--ink)", marginBottom: 3 }}>
                    {tx(exp.role, lang)}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: exp.color, fontWeight: 500 }}>
                      {typeof exp.company === "string" ? exp.company : tx(exp.company, lang)}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--border)" }}>·</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <MapPin size={10} style={{ color: "var(--ink2)" }} />
                      <span style={{ fontSize: 11, color: "var(--ink2)" }}>{exp.city}</span>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: 10, color: "var(--ink2)", letterSpacing: "0.1em", whiteSpace: "nowrap", flexShrink: 0, paddingTop: 3 }}>
                  {tx(exp.period, lang)}
                </span>
              </div>
              {/* Tag pill */}
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 9, color: exp.color, letterSpacing: "0.12em", fontWeight: 500, border: `1px solid ${exp.color}40`, padding: "2px 8px", background: `${exp.color}08` }}>
                  {tx(exp.tag, lang)}
                </span>
              </div>
              {/* Points */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {exp.points.map((pt, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: exp.color, marginTop: 3, fontSize: 8, flexShrink: 0 }}>✦</span>
                    <span style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.7 }}>{tx(pt, lang)}</span>
                  </li>
                ))}
              </ul>
              {/* View Work button — only for cards with gallery */}
              {getGallery(exp.id ?? "") && (
                <button className="view-work-btn" onClick={() => setGallery(getGallery(exp.id ?? ""))}>
                  {lang === "en" ? "View Work →" : "작업 보기 →"}
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {gallery && <PostcardGallery data={gallery} onClose={() => setGallery(null)} />}
      <section id="work" style={{
        background: "var(--white)",
        padding: "100px clamp(1.5rem,5vw,3.5rem)",
      }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Heading */}
        <Reveal>
          <p className="section-label" style={{ marginBottom: 12 }}>{tx(c.label, lang)}</p>
          <h2 className="f-serif" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)",
            fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", marginBottom: 56,
          }}>
            {tx(c.heading1, lang)}<br />
            <em style={{ color: "var(--red)" }}>{tx(c.heading2, lang)}</em>
          </h2>
        </Reveal>

        <ExpGroup items={relevant} labelKey="relevantLabel" />
        <ExpGroup items={extra}    labelKey="extraLabel" />
      </div>
    </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────

function Skills({ lang }: { lang: Lang }) {
  const c = t.skills;
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{
      background: "var(--paper2)",
      padding: "100px clamp(1.5rem,5vw,3.5rem)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <Reveal>
          <p className="section-label" style={{ marginBottom: 12 }}>{tx(c.label, lang)}</p>
          <h2 className="f-serif" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)",
            fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", marginBottom: 64,
          }}>
            {tx(c.heading1, lang)}<br />
            <em style={{ color: "var(--red)" }}>{tx(c.heading2, lang)}</em>
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "4rem 6rem" }}>

          {/* Languages */}
          <Reveal>
            <p className="section-label" style={{ marginBottom: 24 }}>{tx(c.langLabel, lang)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {c.skills.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{tx(s.name, lang)}</span>
                    <span style={{ fontSize: 11, color: "var(--ink2)" }}>{tx(s.note, lang)}</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: vis ? `${s.pct}%` : "0%", background: s.color, transitionDelay: `${i * 0.15}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Technical */}
          <Reveal delay={0.12}>
            <p className="section-label" style={{ marginBottom: 24 }}>{tx(c.techLabel, lang)}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {c.tech.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  paddingBottom: 18,
                  borderBottom: i < c.tech.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <span style={{ color: "var(--red)", fontSize: 10, marginTop: 3 }}>✦</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>
                      {tx(s.name, lang)}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--ink2)" }}>{tx(s.note, lang)}</p>
                  </div>
                </div>
              ))}

              {/* Cert */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                border: "1px solid var(--border)",
                background: "var(--white)",
                marginTop: 8,
              }}>
                <span style={{ fontSize: 18 }}>📊</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>{tx(c.cert.name, lang)}</p>
                  <p style={{ fontSize: 10, color: "var(--ink2)" }}>{tx(c.cert.detail, lang)}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────

function Contact({ lang }: { lang: Lang }) {
  const c = t.contact;
  return (
    <section id="contact" style={{
      background: "var(--ink)",
      padding: "100px clamp(1.5rem,5vw,3.5rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top airmail stripe */}
      <div className="airmail-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        {/* Two-column layout: text left, globe right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(2rem,6vw,6rem)", alignItems: "center" }}>

          {/* Left — text */}
          <Reveal>
            <p className="section-label" style={{ color: "var(--red)", marginBottom: 16 }}>
              {tx(c.label, lang)}
            </p>
            <h2 className="f-serif" style={{
              fontSize: "clamp(2.5rem,7vw,7rem)",
              fontWeight: 300, lineHeight: 1.0, color: "var(--white)",
              marginBottom: 24,
            }}>
              {tx(c.heading1, lang)}<br />
              <em style={{ color: "var(--red)" }}>{tx(c.heading2, lang)}</em>
            </h2>

            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontWeight: 300, maxWidth: 420, lineHeight: 1.9, marginBottom: 44 }}>
              {tx(c.sub, lang)}
            </p>

            {/* CTA button */}
            <a href="mailto:juaoh0424@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "var(--white)",
                fontSize: 12, letterSpacing: "0.12em", fontWeight: 500,
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s",
                marginBottom: 40,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--red)"; e.currentTarget.style.borderColor = "var(--red)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              {tx(c.cta, lang)} <ArrowUpRight size={14} />
            </a>

            {/* Contact info — phone + email only */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 60 }}>
              {/* Phone */}
              <a href="tel:+821038736208"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: 13, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--red)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                010-3873-6208
              </a>
              {/* Email */}
              <a href="mailto:juaoh0424@gmail.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  fontSize: 13, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--red)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
              >
                <Mail size={13} style={{ flexShrink: 0 }} />
                juaoh0424@gmail.com
              </a>
            </div>

            {/* Footer */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 28,
              display: "flex", flexWrap: "wrap",
              justifyContent: "space-between", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
                © 2025 오주아 · JUA OH
              </span>
              <span className="f-hand" style={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }}>
                Seoul → Paris → The World
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Globe size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
                  juaoh0424@gmail.com
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right — 3D spinning globe */}
          <Reveal delay={0.2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Globe3D size={280} color="rgba(196,69,42,0.65)" />
          </Reveal>

        </div>
      </div>

      {/* Bottom airmail stripe */}
      <div className="airmail-stripe" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>("en");

  // Inject global CSS once
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Sync data-lang → triggers Korean typography CSS overrides
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "ko" ? "ko" : "en");
  }, [lang]);

  return (
    <>
      <Navbar lang={lang} toggleLang={() => setLang(l => l === "en" ? "ko" : "en")} />
      <main>
        <Hero    lang={lang} />
        <About   lang={lang} />
        <Work    lang={lang} />
        <Skills  lang={lang} />
        <Contact lang={lang} />
      </main>
    </>
  );
}
