import UserRepository from '../../../../domain/user/repository/write/userRepository';
import { eventStore } from '../eventStore/eventStore';

export default new UserRepository(eventStore);