import { Injectable } from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailUtil {
  private mailgun;

  constructor() {
    this.mailgun = mailgun({
      apiKey: '0e702689bf77923859083e72d39f6523-2b755df8-0d917c6a',
      domain: 'alter-5.com',
      host: 'api.eu.mailgun.net',
    });
  }

  async enviarCorreo(
    destinatario: string,
    asunto: string,
    contenido: string,
  ): Promise<void> {
    const data = {
      from: 'noreply@test.com',
      to: destinatario,
      subject: asunto,
      html: contenido,
    };
    try {
      await this.mailgun.messages().send(data);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo');
    }
  }

  async sendEmailTemplate(
    destinatario: string,
    asunto: string,
    contenido: string,
    fileAttachment?: any,
    cc?: string,
  ): Promise<void> {
    try {
      const data: any = {
        from: 'noreply@test.com',
        to: destinatario,
        subject: asunto,
        html: contenido,
        ...(cc && { cc }),
      };

      if (fileAttachment) {
        data.attachment = fileAttachment;
      }
      const res = await this.mailgun.messages().send(data);
      return res;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo');
    }
  }

  replaceVariablesOnText(
    text: string,
    value: any,
    prefixes: string[] = [],
  ): string {
    let replaced = text;

    if (value !== null && typeof value === 'object') {
      Object.keys(value).forEach((k) => {
        replaced = this.replaceVariablesOnText(replaced, value[k], [
          ...prefixes,
          k,
        ]);
      });
    } else {
      const variablePlaceholder = `{${prefixes.join('.')}}`;
      replaced = replaced.split(variablePlaceholder).join(value);
    }

    return replaced;
  }

  processEmailKey(
    type: string,
    templateCode: string,
    messageVariables: any,
    key: string,
  ): string | undefined {
    let result: string | undefined = undefined;
    const filePath = path.resolve(__dirname, './locales/mail.es.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const typeLocale = JSON.parse(rawData);

    if (typeLocale) {
      const templateLocale = typeLocale[templateCode];

      if (templateLocale) {
        const keyLocale = templateLocale[key];

        if (keyLocale) {
          const text = Array.isArray(keyLocale)
            ? keyLocale.join('\n')
            : keyLocale;
          result = this.replaceVariablesOnText(text, messageVariables);
        }
      }
    }

    return result;
  }

  sendMail(
    type: string,
    templateCode: string,
    messageVariables: any,
    link: string,
    receivers: { title: string; email: string }[],
    attachments: any[] = [],
  ): void {
    const site = 'Alter5';

    const subject = this.processEmailKey(
      type,
      templateCode,
      messageVariables,
      'subject',
    );

    const message = this.processEmailKey(
      type,
      templateCode,
      messageVariables,
      'message',
    );

    const buttonText = this.processEmailKey(
      type,
      templateCode,
      messageVariables,
      'button',
    );

    const mailConfig = {
      from: `${site} <noreply@test.com>`,
      subject: `${site} - ${subject}`,
      html: this.generateEmailHTML(message, link, buttonText), // Usar HTML en línea para correos
      'h:X-Mailgun-Variables': JSON.stringify({
        message,
        link,
        buttonText,
      }),
    };

    if (attachments && attachments.length > 0) {
      //mailConfig.attachment = attachments;
    }

    receivers.forEach((receiver) => {
      const data = Object.assign(
        { to: `${receiver.title} <${receiver.email}>` },
        mailConfig,
      );
      this.mailgun.messages().send(data); // Asegúrate de que `mg` está disponible en tu contexto
    });
  }

  generateEmailHTML(message: string, link: string, buttonText: string): string {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { width: 100%; padding: 20px; }
            .button {
              background-color: #007BFF;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 2px;
              cursor: pointer;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p>${message}</p>
            <a href="${link}" class="button">${buttonText}</a>
          </div>
        </body>
      </html>
    `;
  }
}
