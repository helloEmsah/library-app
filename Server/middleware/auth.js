const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

exports.authentication = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access Denied",
      },
    });
  }

  try {
    const verified = jwt.verify(token, secretKey);

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};
