 module.exports = {
    development: {
       database: 'aktiadb',
       host: 'localhost',
       dialect: 'postgres',
       username: 'lanita',
       password: '',
       logging: false,
       pool: {
          max: 10,
          min: 0,
          idle: 10 * 1000,
          acquire: 10 * 1000,
       },
    },
    test: {
      database: 'aktiatestdb',
      host: 'localhost',
      dialect: 'postgres',
      username: 'lanita',
      password: '',
      logging: false,
      pool: {
         max: 10,
         min: 0,
         idle: 10 * 1000,
         acquire: 10 * 1000,
      },
   },
 };
 