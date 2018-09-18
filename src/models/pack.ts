export class Pack {
    counter: number;
    createdAt: string;
    type: string;
    userId: string;
    id?: string;

    constructor(userId: string, createdAt: string, counter: number, type: string, id?: string) {
            this.userId = userId;
            this.createdAt = createdAt;
            this.counter = counter;
            this.type = type;
            this.id = id;
    }

}
