import { log } from 'util';
import * as express from 'express';
import * as dotenv from 'dotenv';
import serverDecorator from './config/serverDecorator'

dotenv.config();

const app = express();
serverDecorator(app);

app.listen(app.get('port'), () => {
    log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);    
});

export default app;