import Sequelize from 'sequelize'; // allow us to access many databases also makes creating database models easier

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'postgres'
    }
);

const models = {
    User : sequelize.import('./user'),
    Profile : sequelize.import('./profile'),
}

Object.keys(models).forEach(key => {
    if('associate' in models[key]) {
        models[key].associate(models);
    }
})

// authenticates the connection 
sequelize.authenticate()
    .then(() => {
        console.log('connection has been established successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });

export {sequelize};

export default models;