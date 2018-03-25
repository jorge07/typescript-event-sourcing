import { log } from 'util';
import * as express from 'express';
import * as dotenv from 'dotenv';
import serverDecorator from './config/serverDecorator'

dotenv.config();

const app = express();
serverDecorator(app);

app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
});

export default app;