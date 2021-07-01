import { UsersService } from '../../src/users/users.service';

const userService = new UsersService();
export function hasUser(data) {
  console.log(data);
  userService.create(data);
}
