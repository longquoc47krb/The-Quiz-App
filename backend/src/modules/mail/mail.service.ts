import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'winston';

@Injectable()
export class MailService {
    constructor(@Inject('winston')
    private readonly logger: Logger, private readonly mailerService: MailerService) { }

    async sendWelcomeEmail(email: string): Promise<void> {
        // Send welcome email to the provided email address
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to our service!',
            template: 'welcome', // Name of the Pug template file without the extension
            context: {
                // Variables you want to pass to the Pug template
                username: 'John Doe',
            },
        });
        this.logger.info('Sent email successfully', email);
    }
}
