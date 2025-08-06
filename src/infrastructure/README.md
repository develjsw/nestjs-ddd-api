## Infrastructure Layer

### 개요
- 시스템 외부 자원(DB, Cache, Message Queue 등)과의 **구체적인 입출력 구현을 담당하는 계층**
- 상위 계층(Domain, Application)에서 정의된 **인터페이스(interface)** 를 구현하여 **의존성 역전(DIP)** 을 실현
- 외부 기술에 대한 의존성을 이 계층에 한정시켜, **상위 계층의 순수성과 변경 용이성** 확보
- 기술 스택(DB, Redis, 외부 API 등) 변경 시 다른 계층에 영향을 주지 않도록 **격리된 구조 유지**

### 특징
- **의존성 역전 원칙(DIP) 실현**
  - 상위 계층(Domain Layer)은 추상화된 인터페이스에만 의존하고, 실제 구현은 Infrastructure Layer 에서 제공 
- **Persistence 구현**
  - RDB, NoSQL, Redis 등에 대한 로직을 인터페이스 기반으로 구현
  - CQRS 적용 시 command/query 디렉토리로 책임 분리
- **외부 시스템 연동**
  - 이메일, 파일 스토리지, SMS, 결제 API 등 다양한 외부 시스템과의 통신 구현
- **기술 중심 구성**
  - DB, Cache, 외부 연동 등 기술별로 디렉토리를 분리하여 역할 명확화 및 유지보수 용이성 향상 

### 폴더 구조
- [필수] 디렉토리 구조 - 작고 단순한 도메인 또는 초기 프로젝트에 적합
  ```
  infrastructure/
  ├── [도메인]/
  │   └── repository/
  │       ├── command/
  │       │   ├── create-[도메인].command.ts    # 저장 로직
  │       │   ├── update-[도메인].command.ts    # 수정 로직
  │       │   └── delete-[도메인].command.ts    # 삭제 로직
  │       └── query/
  │           └── get-[도메인].query.ts         # 조회 로직
  │   └── [도메인].infrastructure.module.ts     # (선택) NestJS 모듈: repository 구현체 DI 등록
  ├── common/
  │   ├── db/                                    # DB 클라이언트 설정 (Prisma, TypeORM 등)
  │   │   └── prisma.service.ts
  │   ├── cache/                                 # 캐시 연동 (Redis 등)
  │   │   └── redis.service.ts
  │   ├── external/                              # 외부 API 연동
  │   │   └── email.service.ts
  │   └── logger/                                # 로깅 처리
  │       └── winston.logger.ts
  ```
- (선택) 디렉토리 구조 - **도메인이 커지거나 다양한 외부 시스템 및 기술 스택을 사용하는 경우**
  ```
  infrastructure/
  ├── persistence/
  │   ├── db/
  │   │   ├── prisma/
  │   │   │   ├── prisma.service.ts             # Prisma 클라이언트 설정
  │   │   │   └── [도메인].prisma.repository.ts  # 도메인별 Prisma Repository
  │   │   └── typeorm/
  │   │       └── ...
  │   └── redis/
  │       └── redis.service.ts
  ├── integrations/
  │   ├── email/
  │   │   └── sendgrid.service.ts
  │   ├── sms/
  │   │   └── naver-sens.service.ts
  │   └── payment/
  │       └── toss-pay.service.ts
  └── shared/                                  # 공통 유틸리티 및 설정
  │   ├── logger/
  │   ├── exception/
  │   └── config/
  └── [도메인].infrastructure.module.ts         # (선택) 외부 연동 또는 기술 구현체 묶는 모듈
  ```
  
### 주의사항
- 상위 계층의 순수성 유지
  - Infrastructure Layer는 Domain/Application Layer의 DTO나 비즈니스 로직을 직접 참조해서는 안 됨
- Interface 기반 개발 원칙 준수
  - 반드시 상위 계층에서 정의한 인터페이스를 기반으로 구현해야 함
  - 구현체가 상위 계층의 구현 세부사항에 의존하거나, 하위 계층에서 비즈니스 로직을 다루어서는 안 됨
- 기술 교체에 유연한 구조 유지
  - Prisma → TypeORM, Redis → Memcached 등 기술 스택 변경 시에도 상위 계층에 영향이 없어야 함

### 참고: Port / Adapter 개념
| 구분            | 설명                                                              |
|---------------|-----------------------------------------------------------------|
| **Interface**   | 상위 계층에서 정의한 추상 계약 ( EX) `UserRepository`, `EmailSender` )       |
| **구현체**           | 해당 인터페이스를 기반으로 기술 요소(DB, Redis 등)로 구현한 클래스                      |
| **Port (계약)**     | Hexagonal Architecture에서 사용하는 표현. NestJS에서는 보통 interface로 표현    |
| **Adapter (구현체)** | Port를 실제 인프라 기술로 구현한 클래스 ( EX) `UserPrismaRepository` )         |
| **적용 위치**         | Port: Domain/Application Layer<br>Adapter: Infrastructure Layer |

> 이 개념은 이해를 돕기 위한 참고용이며, 실제 코드에서 반드시 `port`, `adapter`라는 이름을 명시적으로 사용할 필요는 없음
