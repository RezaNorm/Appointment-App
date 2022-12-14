import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('all')
  allServices() {
    return this.servicesService.findAllServices();
  }

  @Get(':id')
  findServiceById(@Param() id: string) {
    const service = this.servicesService.findOne(+id);

    if (!service) throw new NotFoundException('Service Not Found');
  }
}
