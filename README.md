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
│   │   │   └── [도메인]-application.module.ts
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
│   │   │   └── [도메인]-infrastructure.module.ts
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

### 구조 설계 방향에 따른 DDD 적용 방식 비교
**고민한 내용** :
- 현재는 모놀리식 구조에서 DDD를 적용해보고 있는 중이며, DB 자체는 도메인마다 분리되어 있지 않음
- 이로 인해 다음과 같은 고민이 발생함
  - 각 도메인의 infrastructure에서 별도 DB 커넥션을 구성하면, 하나의 DB에 대해 다중 커넥션이 생성되어 비효율적
  - 반대로 전역(shared)에서 PrismaService를 관리하면 DDD의 경계를 침범하는 느낌
- 결국 이 문제는 모놀리식 구조이기 때문에 발생하는 상황으로 보았고, DB 커넥션은 싱글톤으로 한 번만 생성하여 재사용하는 것이 맞다는 결론에 도달함

1. 모놀리식 아키텍처에서의 DDD 적용 (NestJS 단일 프로젝트 기준)
    ```
    src/
    ├── modules/
    │   ├── 도메인1/
    │   │   ├── presentation/
    │   │   ├── application/
    │   │   ├── domain/             # Entity, VO, Interface 등
    │   │   └── infrastructure/     # 전역 PrismaService 주입 받아 사용
    │   ├── 도메인2/
    │   └── 도메인3/
    │
    ├── shared/
    │   └── prisma/
    │       └── prisma.service.ts   # PrismaClient를 전역 Singleton으로 관리
    ```
   - 각 도메인은 경계를 유지하되, DB 연결은 shared에서 중앙 관리
   - NestJS의 DI를 활용하여 단일 커넥션을 효율적으로 재사용
   - 현실적인 단일 레포 환경에서 널리 사용되는 방식
   - 비용과 복잡도를 줄이면서도 DDD 원칙을 크게 훼손하지 않음 (단, 이론적으로는 2번 구조가 더 순수한 DDD 적용 형태임)


2. MSA 기반의 DDD 적용 (서비스별 완전 분리)
    ```
    src/
    ├── presentation/
    ├── application/
    ├── domain/                     # Entity, VO, Interface 등
    ├── infrastructure/
    │   └── db/
    │       └── prisma.service.ts   # 서비스 자체의 DB 연결 설정
    └── main.ts
    ```
   - 각 도메인(서비스)은 완전히 독립된 레포지토리 및 DB 구성
   - PrismaService, Schema, 연결 설정도 서비스마다 별도 관리
   - 도메인 간 데이터 공유는 Event 기반 메시징 또는 HTTP 통신
   - MSA 특성상 DDD의 바운디드 컨텍스트 경계를 완벽하게 구현할 수 있음
