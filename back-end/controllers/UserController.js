class UserController {
  async getUserId(req, res) {
    const userId = req.userId;
    return res.status(200).json({ userId });
  }
}

export default UserController;
