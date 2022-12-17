module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5342,
  username: '',
  password: '',
  database: '',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
