import { UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }): UserEntity {
    const { _id, id, name, email, password, roles } = object;

    if (!_id || id) {
      throw new Error("Invalid object");
    }

    if (!name || !email || !password) {
      throw new Error("Invalid object");
    }

    return new UserEntity(id || _id, name, email, password, roles);
  }
}
