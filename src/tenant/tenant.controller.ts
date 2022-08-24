import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Public } from 'src/auth/jwt-auth.guard'

@Public()
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) { }

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantService.findOne(+id);
    if (!tenant)
      throw new HttpException("tenant Not Found", HttpStatus.BAD_REQUEST)
    return tenant
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantService.findOne(+id)
    if (!tenant)
      throw new HttpException("tenant Not Found", HttpStatus.BAD_REQUEST)

    tenant.name = updateTenantDto.name
    tenant.address = updateTenantDto.address


    return this.tenantService.update(+id, tenant);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
