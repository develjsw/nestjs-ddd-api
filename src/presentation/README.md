## Presentation Layer

### 개요 
  - Presentation Layer는 DDD 아키텍처에서 가장 외부에 위치한 계층으로, 사용자 또는 외부 시스템과의 입출력 인터페이스를 담당함
  - 이 계층은 Application Layer에만 의존하며, 도메인 로직을 직접 포함하지 않고 HTTP 요청의 흐름을 제어하고, 입출력 데이터를 다루는 데 집중함

### 특징
  - **외부 요청 처리의 진입점**
    - 클라이언트의 HTTP 요청을 수신하고 응답을 반환하는 역할을 **주로** 수행함
    - Guard, Pipe, Filter 등과 함께 요청 흐름 전반을 다룸
  - **입출력 처리 전담**
    - 요청 데이터 검증, 응답 직렬화 등 클라이언트 입출력 로직에 집중
  - **비즈니스 로직 미포함**
    - 도메인 로직을 직접 수행하지 않으며, 처리는 Application Layer에 위임
  - **계층 간 의존성 명확화**
    - Application Layer에만 의존하며, Domain/Infrastructure Layer에 직접 접근하지 않음
  - **기술 기반 책임 분리**
    - Guard, Pipe, Filter, Interceptor 등을 활용하여 관심사를 분리함

### 폴더 구조
- [필수] 디렉토리 구조
  ```
  presentation/
  ├── controllers/          # 각 도메인별 HTTP 엔드포인트 정의
  │   ├── [도메인].controller.ts
  │   └── ...
  ├── dto/                  # 요청/응답 DTO 정의
  │   ├── request/
  │   │   └── create-[도메인].dto.ts
  │   └── response/
  │       └── [도메인]-response.dto.ts
  └──────
  ```
- (선택) 디렉토리 구조
  ```
  presentation/
  ├── guards/               # 인증/인가 (ex: jwt.guard.ts, roles.guard.ts)
  ├── filters/              # 예외 처리 (ex: http-exception.filter.ts)
  ├── interceptors/         # 응답 포맷팅, 로깅
  ├── pipes/                # 유효성 검사, 데이터 변환
  ├── decorators/           # 커스텀 데코레이터 (ex: @User)
  ├── middleware/           # 전역 미들웨어 (ex: logger.middleware.ts)
  ├── swagger/              # Swagger 설정 (ex: swagger.config.ts)
  └── tests/                # E2E 또는 Controller 테스트
  ```
