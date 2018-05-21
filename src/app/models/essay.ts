export class Essay {
    title: string;
    theme: string;
    essayText: string;
    essayImg: any;

    constructor(title: string, theme: string, essayText?: string, essayImg? : any) {
        this.title = title;
        this.theme = theme;
        this.essayText = essayText;
        this.essayImg = essayImg;
    }

}