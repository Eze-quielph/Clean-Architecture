import {
  AuthDatasource,
  AuthRepository,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthRepositoriesIimpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super();
  }

  login(email: string, password: string): Promise<UserEntity> {
    return this.authDatasource.login(email, password);
  }

  //El repositorio es el encargado del paso de datasource a domain a traves de DI
  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
