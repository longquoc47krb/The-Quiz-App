import { ApiProperty } from '@nestjs/swagger';

/**
 * RefreshToken dto
 */
export class RefreshTokenDto {
    @ApiProperty()
    readonly refreshToken: string;
}