export class CategoryName {
    private readonly value: string;

    constructor(name: string) {
        this.validate(name);
        this.value = name.trim();
    }

    private validate(name: string): void {
        if (!name?.trim()) {
            throw new Error('카테고리 이름이 비어있습니다.');
        }

        if (name.trim().length < 2) {
            throw new Error('카테고리 이름은 최소 2글자 이상이어야 합니다.');
        }

        if (name.trim().length > 50) {
            throw new Error('카테고리 이름은 최대 50글자까지 가능합니다.');
        }
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
