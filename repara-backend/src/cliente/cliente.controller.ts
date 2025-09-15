import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('cliente')
export class ClientesController {
  constructor(private readonly service: ClientesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<Cliente>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Cliente>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
