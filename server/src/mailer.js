import nodemailer from 'nodemailer';

export function createMailer(config) {
  if (!config.mailConfigured) return null;
  const transporter = nodemailer.createTransport({ ...config.smtp, requireTLS: !config.smtp.secure, connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 15000, disableFileAccess: true, disableUrlAccess: true });
  return async values => {
    const result = await transporter.sendMail({
      from: { name: 'Naved Portfolio', address: config.emailFrom },
      to: config.emailTo,
      replyTo: { name: values.name, address: values.email },
      subject: `[Portfolio] ${values.subject}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\nSubject: ${values.subject}\n\n${values.message}`,
    });
    if (!result.accepted?.length) throw new Error('SMTP did not accept a recipient');
  };
}
