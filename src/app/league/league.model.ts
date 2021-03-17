export class League {
    constructor(public id: number,
        public name: string,
        public type: string,
        public logo: string,
        public seasons: Object[]) { }
}