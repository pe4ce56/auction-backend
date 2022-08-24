import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/jwt-auth.guard'
import * as bycrypt from 'bcrypt'
import { ROLES } from './entities/user.entity';
@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = bycrypt.hashSync(createUserDto.password, 10)
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user)
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);
    return user
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(+id);
    if (!user)
      throw new HttpException('Product Not Found', HttpStatus.BAD_REQUEST);

    if (updateUserDto.password) {
      updateUserDto.password = bycrypt.hashSync(updateUserDto.password, 10)
      user.password = updateUserDto.password
    }

    user.name = updateUserDto.name
    user.email = updateUserDto.email
    user.role = updateUserDto.role.toString()
    user.tenant.id = updateUserDto.tenant
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
