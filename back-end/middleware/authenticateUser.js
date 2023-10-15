import jsonwebtoken from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Access token missing" });
  }

  let verifiedToken = "";
  try {
    const token = authHeader.split(" ")[1];
    verifiedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      error:
        'Invalid authorization header. Expected format is "Bearer <token>".',
    });
  }

  if (req.params.userId && verifiedToken.accountId !== req.params.userId) {
    return res.status(401).json({
      error: "This token is not authorized to access the given resource",
    });
  }

  next();
};

export default authenticateUser;
