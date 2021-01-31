import { Sequelize } from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = require('./config.js');

export const sequelize = new Sequelize({
   ...config[env],
   modelPaths: [__dirname + '/models'],
});
