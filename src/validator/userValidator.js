const userValidator = (req, res, next) => {
  let { firstname, lastname, username, password, confirmpassword, email } =
    req.body;
  if (firstname == "" || !firstname) {
    return res.json({
      error: "First Name is required",
    });
  }
  if (lastname == "" || !lastname) {
    return res.json({
      error: "Last Name is required",
    });
  }
  if (username == "" || !username) {
    return res.json({
      error: "User Name is required ",
    });
  }
  if (email == "" || !email) {
    return res.json({
      error: "Email is required",
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

  if (password == "" || !password) {
    return res.json({
      error: "Password is Required",
    });
  }
  if (confirmpassword == "" || !confirmpassword) {
    return res.json({
      error: "Confirm Password is Required",
    });
  }
  if (password.length < 8) {
    return res.json({
      error: "password must have 8 characters",
    });
  }
  if (confirmpassword.length < 8) {
    return res.json({
      error: "confirm password must have 8 characters",
    });
  }
  if (password != confirmpassword) {
    return res.json({
      error: "password does not match",
    });
  }

  next();
};
const userUpdateValidate = (req, res, next) => {
  let { firstname, lastname, username, password, confirmpassword, email } =
    req.body;
  if (firstname == "" || !firstname) {
   return res.json({
      error: "First Name is required",
    });
  }
  if (lastname == "" || !lastname) {
   return res.json({
      error: "Last Name is required",
    });
  }
  if (username == "" || !username) {
   return res.json({
      error: "User Name is required ",
    });
  }
  if (email == "" || !email) {
    return res.json({
      error: "Email is required",
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

export { userValidator, userUpdateValidate };
