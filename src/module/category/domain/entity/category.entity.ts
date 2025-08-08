import { CategoryName } from '../value-object/category-name.vo';

interface CategoryProps {
    userId: number;
    name: CategoryName;
    description?: string;
    createdAt: Date;
}

export class CategoryEntity {
    private constructor(
        public readonly id: number,
        private readonly props: CategoryProps
    ) {}

    static create(userId: number, name: string, description?: string, id?: number): CategoryEntity {
        const nameVO = new CategoryName(name);

        return new CategoryEntity(id ?? 0, {
            userId,
            name: nameVO,
            description,
            createdAt: new Date()
        });
    }

    public getName(): string {
        return this.props.name.getValue();
    }

    public getUserId(): number {
        return this.props.userId;
    }

    public getDescription(): string | null {
        return this.props.description || null;
    }

    public getCreatedAt(): Date {
        return this.props.createdAt;
    }
}
