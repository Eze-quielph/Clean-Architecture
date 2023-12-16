import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { User } from "../../data/mongodb/models/user.model";
import { Bcrypt } from "../../config";
import { UserMapper } from "../mappers/user.mapper";

type compare = (password: string, hash: string) => boolean;
type hash = (password: string) => string;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly compare: compare = Bcrypt.compare,
    private readonly hash: hash = Bcrypt.hash
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const exist = await User.findOne({ email });
      if (exist) throw CustomError.badRequest("Email already exists");

      const user = await User.create({
        name,
        email,
        password: this.hash(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internal("Internal error");
    }
  }
}
