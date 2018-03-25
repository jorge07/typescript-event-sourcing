export default class ConflictError {
    constructor(
        public readonly message: string, 
        public readonly status: number = 409
    ) {
    }
}