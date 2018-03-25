"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
class UserRepository {
    constructor(eventStore) {
        this.eventStore = eventStore;
    }
    save(aggregateRoot) {
        this.eventStore.append(aggregateRoot.getAggregateRootId(), aggregateRoot.getUncommitedEvents());
    }
    load(aggregateRootId) {
        const eventStream = this.eventStore.load(aggregateRootId);
        const user = new user_1.default();
        return user.fromHistory(eventStream);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map