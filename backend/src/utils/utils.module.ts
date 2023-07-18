import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
    imports: [
        forwardRef(() => SharedModule),
    ],
})
export class UtilsModule { }