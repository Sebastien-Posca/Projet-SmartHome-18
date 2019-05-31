export class UserModel {

    userId: number;
    userName: string;
    userPictureUrl: string;

    constructor(userName: string, userPictureUrl: string, userId: number) {
        this.userId = userId;
        this.userName = userName;
        this.userPictureUrl = userPictureUrl;
    }

}
