export class Essay {
    title: string;
    theme: string;
    essayText: string;
    essayImg: any;
    content: any;

    constructor(title: string, theme: string, content: any) {
        this.title = title;
        this.theme = theme;
        this.content = content;
    }

}