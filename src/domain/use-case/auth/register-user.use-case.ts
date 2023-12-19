import { Jwt } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custorm.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface RegisterUserCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUser implements RegisterUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SingToken = Jwt.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto ): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);

    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.internal("Internal Server Error");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
