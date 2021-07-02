import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from '../database/models/user.model';
import { ModelClass } from 'objection';

import * as bcrypt from 'bcrypt';
import Knex from 'knex';

@Injectable()
export class UsersService {
  // Example with DI
  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    // @Inject('KnexConnection') private knex,
  ) {}

  // constructor(
  //   private noteTagsService: NoteTagsService,
  //   @Inject('NoteModel') private modelClass: ModelClass<NoteModel>,
  // ) {}

  // create(props: Partial<UserModel>) {
  //   return this.modelClass.query().insert(props).returning('*');
  // }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashedPassword;
    return await UserModel.query().insert(createUserDto);
  }

  async findAll() {
    return UserModel.query();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    const user = await UserModel.query().findOne({ email });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
