import {BaseException} from "./BaseException.ts";
import {ErrorCode} from "../types/ResponseTypes.ts";

export class AlreadyExistsException extends BaseException{
    constructor(message?: string, options?: ErrorOptions) {
        super(ErrorCode.EXISTS, message, "Already Exists", options);
    }

}