class AuthController {
    index(req, res) {
      res.send("auth page")
    }
  }
  
  module.exports = new AuthController();