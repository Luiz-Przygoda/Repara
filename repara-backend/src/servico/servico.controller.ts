import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServicosService } from './servico.service';
import { Servico } from './servico.entity';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly service: ServicosService) {}

  @Get()
  findAll() {
    return this.service.findAll();
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
