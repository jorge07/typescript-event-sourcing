import { Express } from 'express';
import { log } from 'util';
import { default as routing,  RouteCollection } from './index';

const importer = (app: Express, routes: RouteCollection, method: string) => {
    Object.keys(routes).forEach((key) => {

        switch (method) {
            case 'get':
                app.get(key, routes[key])                
                break;
            case 'post':
                app.post(key, routes[key])                
                break;
            case 'put':
                app.put(key, routes[key])                
                break;
            case 'delete':
                app.delete(key, routes[key])                
                break;
    
            default:
                break;
        }

        log("Imported Route "+ method.toUpperCase() + " " + key)
    })
}

export default (app: Express) => {
    const routes = routing(app);
    Object.keys(routes).forEach((method) => importer(app, routes[method], method))    
}