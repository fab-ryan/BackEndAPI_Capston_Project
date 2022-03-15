import dontenv from "dotenv";
import sgMail from "@sendgrid/mail";
import subscriberModel from "../model/subscriberModel.js";
const sendUserEmail = async (req, res, next) => {
  dontenv.config();
  const EmailFound = await subscriberModel.findOne({ email: req.body.email });
  if (EmailFound) {
    res.status(400).json({ error: `The Email ${req.body.email}` });
  } else {
    sgMail.setApiKey(process.env.API_SEND_GRID_API);

    const mailOption = {
      to: req.body.email,
      from: "royalfabrice1234@gmail.com",
      subject: "Subscribe account",
      text: "You have subscribe to my blog thank you will receive every notification on new blog",
      html: "<strong>You can view my blog Here<a href='https://fab-ryan.github.io/Fabrice-Capstone-Project'>Blog</a></stong>",
    };
    sgMail
      .send(mailOption)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        console.log(error);
      });
    next();
  }
};
export default sendUserEmail;
