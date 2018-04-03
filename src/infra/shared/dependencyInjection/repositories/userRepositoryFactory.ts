import UserRepository from 'domain/user/repository/write/userRepository';
import { eventStore } from '../eventStore/eventStore';
import UserElasticRepository from "infra/user/query/repository/elasticRepository";

export default new UserRepository(eventStore);

export const getUser = new UserElasticRepository();