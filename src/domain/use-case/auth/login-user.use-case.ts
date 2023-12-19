import { AuthRepository, CustomError } from "../..";
import { Jwt } from "../../../config";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginUserCase {
  execute(email: string, password: string): Promise<UserToken>;
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SingToken = Jwt.generateToken
  ) {}

  async execute(email: string, password: string): Promise<UserToken> {
    const user = await this.authRepository.login(email, password);

    const token = await this.signToken({ id: user.id });
    if (!token) throw CustomError.internal("Internal Server Error");
    else {
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }
  }
}
