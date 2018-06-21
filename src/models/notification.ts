export class Notification {
    id: string;
    userId: string;
    reviewId: string;
    timeStamp: string;
    description: string;
    new: boolean;

    constructor(id: string, userId: string, reviewId: string, timeStamp: string, description: string, isNew: boolean) {
        this.id = id;
        this.userId = userId;
        this.reviewId = reviewId;
        this.timeStamp = timeStamp;
        this.description = description;
        this.new = isNew;
    }
}
