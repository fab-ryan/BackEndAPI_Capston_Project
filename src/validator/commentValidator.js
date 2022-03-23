const commentValidator = (req, res, next) => {
  let { fullname, email, comment } = req.body;
  if (fullname == "" || !fullname) {
    return res.status(409).json({
      error: "full Name required",
    });
  }
  if (email == "" || !email) {
    return res.status(409).json({
      error: "email is required",
    });
  }
  if (!email.includes("@") || !email.includes(".")) {
    return res.status(409).json({
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
  if (comment == "" || !comment) {
    return res.status(409).json({
      error: "comment is required",
    });
  }
  next();
};

export default commentValidator;
