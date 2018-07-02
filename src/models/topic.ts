import { Essay } from './essay';

export class Topic {
    id?: string;
    theme: string;
    beginDate: string;
    endDate: string;
    essays?: Essay[];

    constructor(theme: string, beginDate: string, endDate: string, id?: string, essays?: Essay[]) {
        this.theme = theme;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.id = id;
        this.essays = essays;
    }

}
