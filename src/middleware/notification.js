import config from "../config.js";
import sgMail from "@sendgrid/mail";
import subscriberModel from "../model/subscriberModel.js";

const sendNotification = async (blogId) => {
  try {
    const { mail } = config;
    const allSubscriber = await subscriberModel.find({});
    let emails = [];
    allSubscriber.forEach((element) => {
      emails.push(element.email);
    });
    console.log(emails, blogId);

    sgMail.setApiKey(mail);

    const mailOption = {
      to: emails,
      from: "royalfabrice1234@gmail.com",
      subject: "New Blog Has been Added",
      text: "If You are Interested read more by clicking on this link below",
      html:
        "<strong>You can view my blog Here<a href='https://ryanfab.netlify.app/artical.html?" +
        blogId +
        "'>Article</a></stong>",
    };
    sgMail.sendMultiple(mailOption).then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    });
  } catch (error) {
    console.log(error);
  }
};
export default sendNotification;
