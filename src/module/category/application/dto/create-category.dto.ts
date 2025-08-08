export class CreateCategoryDto {
    constructor(
        public readonly userId: number,
        public readonly name: string,
        public readonly description?: string
    ) {}
}
