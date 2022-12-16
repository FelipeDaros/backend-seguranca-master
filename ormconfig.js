module.exports = {
  type: 'sqlite',
  database: './src/database.sqlite',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations',
  },
};
