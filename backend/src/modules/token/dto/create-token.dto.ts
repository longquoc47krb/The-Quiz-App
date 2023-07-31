// create-token.dto.ts
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

export class CreateTokenDTO {
    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsDateString()
    expirationDate: Date;
    @IsNotEmpty()
    user: User;
}
