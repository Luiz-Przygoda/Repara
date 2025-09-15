import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly service: FuncionarioService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<Funcionario>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Funcionario>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
