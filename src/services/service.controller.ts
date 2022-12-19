import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('service')
@ApiTags("Service")
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Get('all')
  allServices() {
    return this.servicesService.findAllServices();
  }

  @Get(':id')
  findServiceById(@Param() id: string) {
    const service = this.servicesService.findOne(+id);

    if (!service) throw new NotFoundException('Service Not Found');
    return service
  }

  
}
