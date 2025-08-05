## Application Layer

### 개요
- 도메인(Domain Layer) 로직과 사용자 인터페이스(Presentation Layer) 사이에서 흐름을 제어하는 중간 계층
- 유즈케이스를 중심으로 도메인 객체를 조합하고 흐름을 제어하는 역할을 담당
- 이 계층은 도메인 로직을 직접 포함하지 않으며, 도메인 객체를 조작하는 로직과 외부 요청 간의 연결고리로 동작함
- 의존성 방향은 Domain Layer에만 의존하고, Presentation/Infrastructure Layer에 의존하지 않음

### 특징
- 유즈케이스 조합 및 실행
  - 기능 단위의 서비스 메서드를 정의하여 각 도메인 로직을 orchestrate함
  - 단일 요청이 여러 도메인 객체의 협력을 필요로 할 때, 그 흐름을 조율
- 도메인 객체 제어 (DTO ↔ Entity 매핑 및 응답 포맷 변환)
  - Presentation Layer에서 받은 DTO를 도메인에서 이해할 수 있는 형식으로 변환
- 트랜잭션 관리
  - 트랜잭션 경계를 설정하고, 필요 시 여러 리포지토리를 조합해 처리
- 입출력 DTO 변환
  - Presentation Layer로부터 받은 요청을 도메인 명세에 맞게 조정하고, 결과를 다시 응답 DTO로 변환
- 도메인 순수성 보장
  - 도메인 계층의 규칙을 침범하지 않고, 흐름 제어만 담당

### 폴더 구조
- [필수] 디렉토리 구조
  ```
  application/
  ├── [도메인]/
  │   ├── service/
  │   │   └── [도메인].service.ts         # 유즈케이스 로직
  │   └── dto/
  │       ├── create-[도메인].dto.ts      # 입력 DTO
  │       └── [도메인]-result.dto.ts      # 출력 DTO
  └──
  ```
- (선택) 디렉토리 구조
  ```
  application/
  ├── [도메인]/
  │   ├── use-case/                   # 유즈케이스를 서비스와 분리하고자 할 때 사용
  │   │   └── create-[도메인].usecase.ts
  │   ├── mapper/                     # DTO ↔ Entity 변환 전담 클래스
  │   │   └── [도메인].mapper.ts
  │   ├── validator/                  # Application 레벨의 입력값 검증 로직
  │   │   └── [도메인].validator.ts
  │   └── service/
  │       └── [도메인].service.ts
  ├── common/
  │   ├── base.service.ts             # 공통 서비스 추상 클래스
  │   └── exceptions/                 # Application 레벨 예외 처리
  │       └── business.exception.ts
  └── ...
  ```