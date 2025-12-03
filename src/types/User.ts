export default interface User {
    id: number;
    name: string;
    email: string;
    type: UserType;
}

export enum UserType {
    USER = 'USER',
    ADMIN = 'ADMIN',
}