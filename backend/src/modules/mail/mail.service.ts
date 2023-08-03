import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'winston';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Token } from '../token/entities/token.entity';

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
    async sendVerificationEmail(email: string, token: Token) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification',
            template: 'verify-email',
            context: {
                url: process.env.APP_URL,
                code: token.token,
                // You can add more template variables if needed
            },
            from: `Quizaka <${process.env.MAIL_USER}>`,
        });
    }
    async sendResetPasswordMail(email: string, token: Token) {
        const user = await this.userService.findByEmail(email);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            template: 'reset-password',
            context: {
                url: process.env.APP_URL,
                name: user.name,
                code: token.token,
            },
            from: `Quizaka <${process.env.MAIL_USER}>`,
        });
    }
}
