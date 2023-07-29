import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'winston';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(@Inject('winston')
    private readonly logger: Logger, private readonly mailerService: MailerService, private userService: UserService) { }

    async sendWelcomeEmail(email: string, username: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to our service!',
            template: 'welcome',
            context: {
                // Variables you want to pass to the Pug template
                username: username,
            },
            from: `Quizaka <${process.env.MAIL_USER}>`,
        });
        this.logger.info('Sent email successfully', email);
    }
    async sendVerificationEmail(email: string, verificationCode: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification',
            template: 'src/views/verify-email.pug',
            context: {
                code: verificationCode,
                // You can add more template variables if needed
            },
            sender: `"Quizaka" <${process.env.MAIL_USER}>`
        });
    }
}
