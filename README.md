# ValuenCores — Official Website Clone

## 프로젝트 개요
`www.valuencores.com` 의 구조·비주얼·콘텐츠를 기반으로 제작된
**싱글 페이지 반응형 정적 웹사이트**입니다.

---

## 완성된 섹션 (세로 전개 순서)

| # | 섹션 | 배경 색상 | 주요 비주얼 |
|---|------|----------|------------|
| 1 | **Hero** | 따뜻한 오프화이트 (`#ede9e4`) | Canvas 네트워크 / 방사선 애니메이션 |
| 2 | **Core** | 라이트 그레이 (`#e4e0db`) | Canvas 파티클 구체 + 중앙 블랙 dot |
| 3 | **Rhythm** | 라이트 그레이 | Canvas 그리드 + 파동 곡선 + 산점도 |
| 4 | **Structure** | 미드 그레이 (`#cecbc6`) | Canvas 그리드 + 다양한 크기 점 분포 |
| 5 | **Algorithm** | 미드 그레이 | Canvas 방사형 스포크 네트워크 (회전) |
| 6 | **AI** | 다크 그레이 (`#9b9b9b`) | Canvas 신경망 분기 + AI 텍스트 |
| 7 | **Flow** | 다크 그레이 | Canvas 리사주 곡선 (회전 리본) |
| 8 | **Business Divisions** | 더 다크 (`#575757`) | Canvas 4-orb 궤도 + 3개 카드 |
| 9 | **The Architects** | 더 다크 | Canvas 라인아트 인물 (LIHAM·NAHDAN·JAY) |
| 10 | **Network** | 다크 (`#3b3b3b`) | 파트너 목록 텍스트 |
| 11 | **Contact** | 니어블랙 (`#181818`) | 연락처 폼 + 주소 정보 |

---

## 파일 구조

```
index.html               ← 메인 싱글 페이지
css/
  style.css              ← 전체 스타일 (반응형 포함)
js/
  canvas-animations.js   ← 모든 Canvas 애니메이션 (11개)
  main.js                ← 스크롤 리빌, 폼 제출, 토스트 메시지
```

---

## 기능 요약

- **11개 Canvas 애니메이션** — Hero부터 Flow까지 각 섹션 고유 비주얼
- **Scroll-reveal** — 스크롤 진입 시 섹션 fade-up 애니메이션
- **Sticky Navbar** — 스크롤 시 그림자 전환, Contact Us CTA 버튼
- **Contact Form** — REST Table API 연동, 성공/실패 토스트 메시지
- **완전 반응형** — 모바일(600px↓) / 태블릿(900px↓) / 데스크톱

---

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| POST | `tables/contacts` | 연락처 메시지 저장 |
| GET  | `tables/contacts` | 수신된 메시지 목록 조회 |

---

## 미구현 / 향후 개발

- [ ] 실제 팀원 사진 교체 (현재 Canvas 라인아트)
- [ ] 각 Division 상세 페이지 링크
- [ ] 블로그 / 뉴스 섹션
- [ ] 다국어(한/영) 전환 기능
- [ ] 연락처 폼 이메일 실제 발송 연동
