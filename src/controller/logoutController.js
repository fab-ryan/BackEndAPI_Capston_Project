import bcrypt from "bcrypt";
const logout = async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));

    let hashedRandomNumberToAppend = await bcrypt.hash(
      randomNumberToAppend,
      10
    );

    token = token + hashedRandomNumberToAppend;
    return res.status(200).json("logout");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export { logout };
