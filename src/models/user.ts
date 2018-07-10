export class User {
    email: string;
    username: string;
    name: string;
    gender: string;
    password: string;
    usingWeekelyTopic: boolean;
    photoUrl?: string;
    id?: string;

    constructor(email: string, username: string, name: string, gender: string,
                password: string, photoUrl?: string, id?: string, usingWeekelyTopic?: boolean) {
        this.email = email;
        this.username = username;
        this.name = name;
        this.gender = gender;
        this.password = password;
        this.photoUrl = photoUrl;
        this.id = id;
        this.usingWeekelyTopic = usingWeekelyTopic;
    }

}
