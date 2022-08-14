import Sequelize from 'sequelize';
import 'dotenv/config';

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});

export default db;