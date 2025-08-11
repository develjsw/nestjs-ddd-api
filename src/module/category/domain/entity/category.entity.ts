import { CategoryUserIdVo } from '../value-object/category-user-id.vo';
import { CategoryNameVo } from '../value-object/category-name.vo';

type CreateProps = {
    userId: CategoryUserIdVo;
    name: CategoryNameVo;
    description?: string | null;
    createdAt?: Date;
};

export class CategoryEntity {
    private constructor(
        private readonly id: number | null,
        private userId: CategoryUserIdVo,
        private name: CategoryNameVo,
        private description: string | null,
        private readonly createdAt: Date
    ) {}

    static create(props: CreateProps): CategoryEntity {
        return new CategoryEntity(
            null,
            props.userId,
            props.name,
            props.description ?? null,
            props.createdAt ?? new Date()
        );
    }

    getId(): number | null {
        return this.id;
    }

    getUserId(): number {
        return this.userId.getUserId();
    }

    getName(): string {
        return this.name.getName();
    }

    getDescription(): string | null {
        return this.description;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }
}
