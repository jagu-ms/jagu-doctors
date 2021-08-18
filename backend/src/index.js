import 'dotenv/config';
import models, {sequelize} from './models';
import app from './app';

// connectes directly when the server start
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('elhmdlh express is running');
    });
});


