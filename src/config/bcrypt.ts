import {hashSync, genSaltSync, compareSync} from 'bcryptjs'

export class Bcrypt {

    static hash(password:string): string{

        return hashSync(password, genSaltSync(10))
    }

    static compare(password:string, hash:string): boolean{
            
            return compareSync(password, hash)
    }

}