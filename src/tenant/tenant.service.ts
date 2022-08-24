import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {

  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>
  ) { }

  create(user: any) {
    return this.tenantRepository.create(user);
  }

  findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find({
      relations: ['users']
    });
  }

  findOne(id: number): Promise<Tenant> {
    return this.tenantRepository.findOne({
      where: {
        id
      },
      relations: ['users']
    });
  }

  update(id: number, tenant: Tenant): Promise<Tenant> {
    return this.tenantRepository.save(tenant);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.tenantRepository.delete(id);
  }
}
