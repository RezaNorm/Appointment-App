import { PipeTransform, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class Freeze implements PipeTransform {
  private readonly logger = new Logger(Freeze.name);

  transform(value: string) {
    this.logger.debug('Freezing pipe runnin ...');
    Object.freeze(value);
    return value;
  }
}
