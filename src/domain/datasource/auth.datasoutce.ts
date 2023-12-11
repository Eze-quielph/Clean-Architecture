import { UserEntity } from "../entities/user.entities";
import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthDatasource {

    //todo :
    //abstract login ()

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
