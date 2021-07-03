import { UsersService } from '../../src/users/users.service';

const userService = new UsersService();
export async function hasUser(data) {
  return userService.create(data);
}
