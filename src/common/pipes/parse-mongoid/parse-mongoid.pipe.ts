import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoidPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    if ( !isValidObjectId(value)) {
      throw new BadRequestException("Invalid mongo id");
    }
    return value;
  }
}
