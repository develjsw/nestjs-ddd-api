## NestJS 기반 DDD 아키텍처 학습 프로젝트

**참고** : 해당 프로젝트는 "Why?"라는 질문을 던져가며 계속 테스트 해보고 더 나은 구조로 만들기 위함이므로 지속적으로 변경될 예정

### ⚙️ 프로젝트 환경

| 항목 | 내용                        |
|------|---------------------------|
| **Framework**       | NestJS v11.x              |
| **Language**        | TypeScript v5.9.x         |
| **Runtime**         | Node.js v22.x             |
| **Package Manager** | pnpm                      |
| **Architecture**    | Domain-Driven Design (DDD) |
| **Purpose**         | DDD 구조 실습 및 설계 학습         |


### 폴더 구조
```
src/
├── modules/                              # 도메인 단위 모듈 집합
│   ├── [도메인]/
│   │   ├── presentation/
│   │   │   ├── controllers/
│   │   │   └── dto/
│   │   │       ├── request/
│   │   │       └── response/
│   │   ├── application/
│   │   │   ├── service/
│   │   │   ├── use-case/
│   │   │   ├── mapper/
│   │   │   ├── validator/
│   │   │   └── [도메인].application.module.ts
│   │   ├── domain/
│   │   │   ├── entity/
│   │   │   ├── value-object/
│   │   │   ├── interface/
│   │   │   ├── service/
│   │   │   ├── event/
│   │   │   ├── policy/
│   │   │   ├── exception/
│   │   │   └── common/
│   │   ├── infrastructure/
│   │   │   ├── repository/
│   │   │   │   ├── command/
│   │   │   │   └── query/
│   │   │   ├── integrations/
│   │   │   └── [도메인].infrastructure.module.ts
│   │   └── [도메인].module.ts               # 도메인 단위 통합 NestJS 모듈
    ...
│
├── shared/                                 # 공통 유틸리티 및 설정
│   ├── logger/
│   ├── exception/
│   ├── config/
│   └── base/
│       ├── base.entity.ts
│       ├── base.vo.ts
│       └── domain.types.ts
│
├── app.module.ts                           # 루트 애플리케이션 모듈 (각 도메인 모듈 import)
└── main.ts                                 # 애플리케이션 실행 진입점
```