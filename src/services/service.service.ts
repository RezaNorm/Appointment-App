import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service, ServiceGroupName } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllServices(): Promise<ServiceGroupName[]> {
    return await this.prismaService.serviceGroupName.findMany({
      include: {
        service: true,
      },
    });
  }

  async findOne(id: number): Promise<Service> {
    return await this.prismaService.service.findUnique({
      where: {
        id,
      },
    });
  }
}
