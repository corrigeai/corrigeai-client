export class Essay {
    title: string;
    theme: string;
    id: string;
    content: any;
    type: string;
    premium?: boolean;

    constructor(id: string, title: string, theme: string, content: any, type: string, premium?: boolean) {
        this.id = id;
        this.title = title;
        this.theme = theme;
        this.content = content;
        this.type = type;
        this.premium = premium;
    }

}
