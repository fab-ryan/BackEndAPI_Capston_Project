const commentValidator = (req, res, next) => {
  let { fullname, email, comment } = req.body;
  if (fullname == "" || !fullname) {
    res.json({
      error: "full Name required",
    });
  }
  if (email == "" || !email) {
    res.json({
      error: "email is required",
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
  if (comment == "" || !comment) {
    res.json({
      error: "comment is required",
    });
  }
  next();
};

export default commentValidator;