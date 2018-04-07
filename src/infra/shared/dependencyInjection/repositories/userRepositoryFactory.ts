import { userEventStore } from '../eventStore/eventStore';
import UserElasticRepository from "infra/user/query/repository/elasticRepository";
import WriteRepository from "infra/shared/repository/writeRepository";
import User from "domain/user/model/user";

export default new WriteRepository<User>(userEventStore);

export const getUser = new UserElasticRepository();