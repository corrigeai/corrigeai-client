export class Essay {
    title: string;
    theme: string;
    id: string;
    content: any;

    constructor(id: string, title: string, theme: string, content: any) {
        this.id = id;
        this.title = title;
        this.theme = theme;
        this.content = content;
    }

}