import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}



  findAllServices() {
    return this.prismaService.serviceGroupName.findMany({
      include: {
        service: true,
      },
    });
  }
}
