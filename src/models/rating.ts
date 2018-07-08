export class Rating {
    userId: string;
    reviewId: string;
    vote: string;
    comment: string;
    id?: string;

    constructor(userId: string, reviewId: string, vote: string, comment: string, id?: string) {
            this.userId = userId;
            this.reviewId = reviewId;
            this.vote = vote;
            this.comment = comment;
            this.id = id;
    }

}
