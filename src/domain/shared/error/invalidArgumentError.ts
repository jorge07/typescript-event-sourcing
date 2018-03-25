export default class InvalidArgumentError {
    constructor(
        public readonly message: string, 
        public readonly status: number = 400
    ) {
    }
}