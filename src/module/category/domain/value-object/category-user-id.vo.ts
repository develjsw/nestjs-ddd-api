export class CategoryUserIdVo {
    private readonly userId: number;

    constructor(userId: number) {
        this.validate(userId);
        this.userId = userId;
    }

    validate(userId: number): void {
        if (!userId) {
            throw new Error('유저ID는 필수 값입니다.');
        }
    }

    getUserId(): number {
        return this.userId;
    }
}
