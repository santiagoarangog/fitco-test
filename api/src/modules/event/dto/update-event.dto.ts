import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { TypeEvent } from './../../../common/enums/type-event.enum';

export class UpdateEventDto {
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
    description: 'Ubicación del evento',
    example: 'Test of the test',
    type: String,
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Tipo de evento',
    example: 'CARDIO',
    type: Array,
  })
  @IsOptional()
  @IsString()
  type: TypeEvent;

  @ApiProperty({
    description: 'Indica si el evento esta activo',
    example: true,
    type: String,
  })
  @IsBoolean()
  isActive: boolean;
}
