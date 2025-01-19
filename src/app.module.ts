// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { StudentSchema } from './schema/student.schema';
// import { StudentService } from './student/student.service';
// import { StudentController } from './student/student.controller';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb+srv://mine:supor@cluster0.8lsutr0.mongodb.net/nest', {
//       dbName: 'studentdb',
//     }),
//     MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
//   ],
//   controllers: [AppController, StudentController],
//   providers: [AppService, StudentService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentSchema } from './schema/student.schema';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration accessible globally
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Load the URL from .env
        dbName: configService.get<string>('DATABASE_NAME'), // Load the DB name from .env
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
