import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ServiceEntity } from './entity/service.entity';
import { Service, ServiceGroupName } from '@prisma/client';

@Controller('service')
@ApiTags('Service')
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Get('all')
  @ApiCreatedResponse({ type: ServiceEntity, isArray: true })
  allServices(): Promise<ServiceGroupName[]>{
    return this.servicesService.findAllServices();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ServiceEntity })
  findServiceById(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    const service = this.servicesService.findOne(id);

    if (!service) throw new NotFoundException('Service Not Found');
    return service;
  }
}
