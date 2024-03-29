const User = require("../../models/user");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");

export default async (req, res) => {
  const { username, email, rollNo, password } = req.body;
  if (!username || !email || !rollNo || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  User.findOne({ email: email }, async (err, obj) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
    if (obj) {
      return res.status(409).json({
        message:
          "Email already registered. Please register with another email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomstring.generate(12);
    const transporter = nodemailer.createTransport({
      host: "mail.iitp.ac.in",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "E-cell Email Verification",
      text: "You have registered successfully at Ecell IIT Patna . Click the link to activate your account and login",
      html: `<p>You have registered successfully at Ecell IIT Patna . Click the below link to activate your account and login </p>
                 <h4><a href="${process.env.CLIENT_URL}/auth/verify/${verificationToken}/${email}">Verify Email Address</h4>`,
    };

    transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        console.log("MailSendingError: ", error);
        return res.status(503).json({
          message: "Sorry, Please try again after couple of minutes.",
        });
      } else {
        User.create(
          {
            username: username,
            email: email,
            rollNo: rollNo,
            password: hashedPassword,
            verificationToken: verificationToken,
            isVerified: false,
          },
          (err, _obj) => {
            if (err) {
              if (err.name === "MongoError" && err.code === 11000) {
                return res.status(409).json({
                  message:
                    "User Already exists with same Email/RollNo/Username",
                });
              } else {
                return res.status(500).json({
                  message: "Couln't create User. Please contact administrator.",
                });
              }
            } else {
              return res.status(200).json({
                message: "A mail has been sent to your email address.",
              });
            }
          }
        );
      }
    });
  });
  return;
};
