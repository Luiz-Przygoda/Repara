import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdemServicoService } from './ordemServico.service';
import { OrdemServico } from './ordemServico.entity';

@Controller('ordemServico')
export class OrdemServicoController {
  constructor(private readonly service: OrdemServicoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('test')
  test() {
    return { message: 'Endpoint funcionando', timestamp: new Date() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() data: Partial<OrdemServico>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<OrdemServico>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
