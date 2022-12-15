import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/database.sql',
      entities: [__dirname + '/**/*.entity.js'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
