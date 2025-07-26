import { Controller, Get } from '@nestjs/common';
import { AppService, StatusResponse } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Check API status' })
  @ApiResponse({ status: 200, type: StatusResponse })
  healthyCheck(): StatusResponse {
    return this.appService.healthyCheck();
  }
}