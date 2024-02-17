import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendMail = async({email, emailType, userId}:any)=>{
    try{

        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType==="VERIFY")
        {
            await User.findOneAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }else if(emailType==='RESET'){
            await User.findOneAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            }) 
        }


        // const transporter = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD
        //     }
        // })

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9bfb9c44bbef80",
              pass: "034a1eee130386"
            }
          });

        const mailOptions = {
            from:"anubhav@gmail.com",
            to:email,
            subject: emailType==="VERIFY"?"Email Verification":"RESET Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}</p>`
        }

    //    console.log(process.env.EMAIL_USER,"username");
    //    console.log(process.env.EMAIL_PASSWORD,"pass");
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    }catch(err:any)
    {
        console.log(err.message);
        throw new Error(err.message);
    }
}