import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ServicosService } from './servico.service';
import { Servico } from './servico.entity';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly service: ServicosService) {}

  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar serviços: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<Servico>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Servico>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
