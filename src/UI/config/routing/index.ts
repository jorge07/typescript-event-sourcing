import { Express } from 'express';
import { default as UserController, GetUser } from '../../controller/user'

export type RouteCollection = {
    [key: string]: Function | any
}

export default (app: Express): RouteCollection => (<RouteCollection> {
    "get": {
        "/": (req, res) => res.json('ok'),
        "/users/:uuid": GetUser(app.get('queryBus'))
    },
    "post": {
        "/users": UserController(app.get('commandBus'))
    }
})
