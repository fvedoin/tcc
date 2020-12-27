import express from 'express';
import cors from 'cors';

import userInterceptor from './interceptors/user-interceptor';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userInterceptor);
app.use(routes);

app.listen(3333);