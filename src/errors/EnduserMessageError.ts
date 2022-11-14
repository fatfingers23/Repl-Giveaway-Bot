class EnduserMessageError extends  Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, EnduserMessageError.prototype)
    }
}
export default EnduserMessageError;