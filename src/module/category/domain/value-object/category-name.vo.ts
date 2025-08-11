export class CategoryNameVo {
    private readonly name: string;

    constructor(name: string) {
        this.validate(name);
        this.name = name;
    }

    private validate(name: string): void {
        if (!name?.trim()) {
            throw new Error('카테고리 이름이 비어 있습니다.');
        }

        if (name.trim().length < 2) {
            throw new Error('카테고리 이름은 2글자 이상이여야 합니다.');
        }
    }

    getName(): string {
        return this.name;
    }
}
