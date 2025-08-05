## Domain Layer

### 개요
- Domain Layer는 시스템의 핵심 **비즈니스 규칙과 도메인 모델을 정의하는 계층**으로, DDD 아키텍처의 중심을 이룸
- 비즈니스 개념을 기반으로 Entity, Value Object, Domain Service, Domain Event 등을 통해 로직과 상태를 모델링
- **외부 계층에 의존하지 않으며**, 순수한 TypeScript/JavaScript 객체로 구성되어야 함
- 도메인 객체의 내부 일관성과 불변성을 보장하며, 외부 변화에 영향을 받지 않는 독립적인 로직 유지

### 특징
- **도메인 모델 정의**
  - 시스템이 해결해야 할 문제를 개념적으로 표현한 Entity 및 Value Object로 구성 
  - **Entity는 식별자(PK)를 갖고, 상태 변경이 가능**하며, **VO는 식별자 없이 값 자체가 동일성 기준이 되는 불변 객체**
    - EX) User(Entity), UserName, Email (VO)
- **상태와 행위의 응집**
  - 상태(데이터)와 그에 대한 행위(메서드)를 하나의 객체에 응집시켜, 풍부한 도메인 모델을 구성
- **도메인 서비스 활용**
  - 하나의 Entity 만으로 구현하기 어려운 비즈니스 로직은 Domain Service로 분리
    - EX) 두 사용자의 등급 비교, 두 계좌 간 송금처리 등
- **도메인 이벤트 발행**
  - 중요한 상태 변경은 이벤트로 발행하고, 후속 처리( EX) 알림 발송 )는 Application Layer에서 수행 
- **외부 의존성 배제**
  - DB 접근, 외부 API 호출 등은 전혀 포함되지 않으며, 필요한 의존은 **인터페이스로만 추상화**하고 구현은 Infrastructure Layer에 위임

### 폴더 구조
- [필수] 디렉토리 구조
  ```
  domain/
  ├── [도메인]/
  │   ├── entity/
  │   │   └── [도메인].entity.ts              # Entity: 식별자(PK)를 가지며, 상태/행위를 포함하는 핵심 비즈니스 객체
  │   ├── interface/
  │   │   └── [도메인]-repository.interface.ts # Repository 인터페이스 (Persistence 추상화 전용, 구현 없음)
  │   ├── value-object/
  │   │   └── [도메인]-name.vo.ts             # Value Object: 불변 객체, 값 자체로 동등성 판단 ( EX) 이름, 주소, 이메일 등 )
  └──
  ```
- (선택) 디렉토리 구조 – 복잡한 도메인 로직이나 확장이 필요할 때 도입 고려
  ```
  domain/
  ├── [도메인]/
  │   ├── entity/
  │   │   └── [도메인].entity.ts
  │   ├── interface/
  │   │   └── [도메인]-repository.interface.ts
  │   ├── value-object/
  │   │   └── [도메인]-name.vo.ts             # VO는 반드시 필요한 것은 아니며, "해당 필드가 비즈니스적으로 의미가 있는가?"가 도입 판단 기준
  │   ├── service/                           # 도메인 서비스: 두 개 이상의 Entity 간 협력 또는 외부 정책 의존 로직을 처리
  │   │   └── [도메인].service.ts
  │   ├── event/                             # 도메인 이벤트: 상태 변화에 따른 후속 처리 트리거 ( EX) OrderCreated )
  │   │   └── [도메인]-created.event.ts
  │   ├── exception/                         # 도메인 전용 예외: 유효하지 않은 상태에 대한 명확한 표현
  │   │   └── invalid-[도메인].exception.ts
  │   └── policy/                            # 정책 객체: 전략 패턴 기반의 유연한 도메인 정책 구성 ( EX) 할인 정책, 포인트 적립 기준 등 )
  │       └── [도메인].policy.ts
  ├── common/
  │   ├── base.entity.ts                    # 공통 Entity 추상 클래스 ( EX) ID getter, 동등성 판단 등 )
  │   ├── base.vo.ts                        # 공통 VO 추상 클래스 ( EX) equals, validate 등 )
  │   └── domain.types.ts                   # 도메인 전역 enum, 타입 정의 ( EX) Role, Status 등 )
  └──
  ```