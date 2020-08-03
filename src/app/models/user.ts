export class User{

    constructor(
        public id: number,
        public identificationCard: string,
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public imageProfile: string,
        public role: string,
        public study: string,
        public vote: string

    ) {}

}