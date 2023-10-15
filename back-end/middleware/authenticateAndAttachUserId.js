import jsonwebtoken from "jsonwebtoken";

const authenticateAndAttachUserId = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Access token missing" });
  }

  let verifiedToken = "";
  try {
    const token = authHeader.split(" ")[1];
    verifiedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.userId = verifiedToken.accountId;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticateAndAttachUserId;
