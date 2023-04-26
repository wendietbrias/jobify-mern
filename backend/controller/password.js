import nodemailer from "nodemailer";
import user from "../schemas/user.js";

  const ForgotPassword = async (req,res) => {
     const {
      email 
     } = req.body;

     try {

      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "wendietbrias@gmail.com", // generated ethereal user
          pass: "jscvxtxqomfemdek", // generated ethereal password
        },
      });

      // const findUser = await user.findOne({ email:email });

      // if(!findUser) {
      //   return res.status(404).json({message:"upss that email is not registring in our database"});
      // }


      const sendingMail = await transporter.sendMail({
        from:"wendi.6915@ski.sch.id",
        to:`${email}`, 
        subject:"Reset password",
        text:"Reset your password here",
        html:`
          <!DOCTYPE html>
          <html>
            <head>
             <meta charset="utf-8">
            </head> 
            <body>
              <div>
                <h2>Reset your password</h2>
                <p>click the button below and it will redirect your to reset password page</p>
                <button>
                 <a href="http://localhost:3000/password/reset-password/id">Reset Password</a>
                </button>

              </div>
            </body>
          </html>

        `
      });

      if(sendingMail) {
        return res.status(200).json({message:"check your email"});
      }

      return res.status(400).json({message:"fail while send email"});

     } catch(err) {
        return res.status(500).json({message:err.message});
     }
  }

  const ResetPassword = async (req,res) => {
     const {
      password, 
      confirm ,
      email 
     } = req.body;

     try {
       const verifUser = await user.findOne({ email:email });

       if(verifUser) {

          if(password != confirm) {
            return res.status(400).json({message:"password is not match"});
          }

       }

     } catch(err) {
      return res.status(500).json({
        message:err.message
      });
     }
  }

  export {
    ForgotPassword,
    ResetPassword
  }