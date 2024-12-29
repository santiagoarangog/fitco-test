import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RequestDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Cantidad de elementos a obtener',
  })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Desplazamiento para la paginación',
  })
  @IsOptional()
  @IsString()
  offset?: string;
}
