import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 27017,
      host:"localhost",
      type: 'mongodb',
      database: 'auth',
      autoLoadEntities: true
    }),
    UserModule,
    ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
