import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/providers/user/user.entity';
import { PublicationModule } from './publication/publication.module';
import { PublicationEntity } from './publication/providers/publication/publication.entity';
import { LikeEntity } from './publication/providers/like/like.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace ConfigService disponible en toda la aplicación
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [
          UserEntity,
          PublicationEntity,
          LikeEntity,
        ],
        synchronize: configService.get('DB_SYNC'),
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UserModule,
    PublicationModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }