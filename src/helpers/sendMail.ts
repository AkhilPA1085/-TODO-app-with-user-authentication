import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';
import nodemailer from 'nodemailer'

type SendMailProps = {
    email:string,
    emailType:'VERIFY'|'RESET',
    userId:string
}

export const sendMail = async ({ email, emailType, userId }: SendMailProps) => {
    try {
        // create a hashedToken
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyPasswordToken: hashedToken,
                    verifyPasswordTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASSWORD
            }
        });
        const mailOptions = {
            from: 'akh@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href=${process.env.DOMAIN}/${emailType==='VERIFY'?`verifyemail`:'resetpassword'}?token=${hashedToken}> here </a> to 
            ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
}