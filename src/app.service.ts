import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty()
  status: string;
}

@Injectable()
export class AppService {
  healthyCheck(): StatusResponse {
    return {
      status: 'UP!'
    };
  }
}