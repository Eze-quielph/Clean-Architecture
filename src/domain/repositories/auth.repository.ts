import { UserEntity } from "../entities/user.entities";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";

export abstract class AuthRepository {
  //todo :
  abstract login(email: string, password: string): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
