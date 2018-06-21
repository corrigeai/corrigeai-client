export class Review {
    id: string;
    essayId: any;
    comments: string[];
    ratings: number[];

    constructor(id: string, essayId: string, comments: string[], ratings: number[]) {
        this.id = id;
        this.essayId = essayId;
        this.comments = comments;
        this.ratings = ratings;
    }

}
