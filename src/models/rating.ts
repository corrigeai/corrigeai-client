export class Rating {
    id?: string;
    userId: string;
    reviewId: string;
    vote: string;
    comment: string;

    constructor(userId: string, reviewId: string, vote: string, comment: string, id?: string) {
            this.id = id;
            this.userId = userId;
            this.reviewId = reviewId;
            this.vote = vote;
            this.comment = comment;
    }

}
