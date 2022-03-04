const messageValidator = (req, res, next) => {
  let { email, name, message } = req.body;
  if (email == "") {
    return res.json({
      error: "Email is required",
    });
  }
  if (name == "") {
    return res.json({
      error: "name is required",
    });
  }
  if (message == "") {
    return res.status(404).json({
      error: "Message is Required",
    });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.json({
      error: "The email is Incomplete",
    });
  }
  const atpos = email.indexOf("@");
  const dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos - atpos < 2) {
    return res.json({
      error: "The email is Incomplete",
    });
  }
  next();
};
export { messageValidator as default };
