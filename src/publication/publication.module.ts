import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './providers/publication/publication.repository';
import { LikeRepository } from './providers/like/like.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME')
        }
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository, LikeRepository]
})
export class PublicationModule {}
