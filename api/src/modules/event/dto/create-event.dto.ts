import { TypeEvent } from './../../../common/enums/type-event.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'El nombre del evento',
    example: 'Test of the test',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del evento',
    example: 'Test of the test',
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Tipo de evento',
    example: 'CARDIO',
    type: Array,
  })
  @IsOptional()
  @IsString()
  type: TypeEvent;

  @ApiProperty({
    description: 'Ubicación del evento',
    example: 'Test of the test',
    type: String,
  })
  @IsString()
  location: string;
}
