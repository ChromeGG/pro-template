import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from '../database/models/user.model';
import { ModelClass, transaction } from 'objection';

@Injectable()
export class UsersService {
  // Example with DI
  // constructor(@Inject('UserModel') private modelClass: ModelClass<UserModel>) {}
  // create(props: Partial<TagModel>) {
  //   return this.modelClass.query().insert(props).returning('*');
  // }

  async create(createUserDto: CreateUserDto) {
    return await UserModel.query().insert(createUserDto);
  }

  async findAll() {
    return UserModel.query();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByFirstName(firstName: string) {
    const user = await UserModel.query().findOne({ firstName });

    console.log(user);
    return user;
    // return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
