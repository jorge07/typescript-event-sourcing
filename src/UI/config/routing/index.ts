import { Express } from 'express';
import { CreateUser, GetUser } from 'ui/controller/user'

export type RouteCollection = {
    [key: string]: Function | any
}

export default (app: Express): RouteCollection => (<RouteCollection> {
    "get": {
        "/": (req, res) => res.json('ok'),
        "/users/:uuid": GetUser(app.get('queryBus'))
    },
    "post": {
        "/users": CreateUser(app.get('commandBus'))
    }
})
