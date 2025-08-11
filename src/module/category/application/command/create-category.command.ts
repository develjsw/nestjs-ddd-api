// TODO : 여러곳에서 많이 사용된다면 static도 고려
export class CreateCategoryCommand {
    constructor(
        public readonly userId: number,
        public readonly name: string,
        public readonly description?: string | null
    ) {}
}
