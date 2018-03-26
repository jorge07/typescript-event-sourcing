"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const user_1 = require("domain/user/model/user");
class CreateUserHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    handle(command, success, error) {
        try {
            const userAlreadyExist = this.userRepository.load(command.uuid);
            util_1.log('User Already Exists');
            error({
                message: 'User Already Exist',
                code: 409
            });
        }
        catch (err) {
            const user = user_1.default.create(command.uuid, command.email);
            this.userRepository.save(user);
            success({
                data: 'ack'
            });
        }
    }
}
exports.default = CreateUserHandler;
//# sourceMappingURL=createUserHandler.js.map