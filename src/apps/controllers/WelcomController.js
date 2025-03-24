class WelcomeController {
    // [GET] /
    index(req, res) {
      res.send("welcome page")
    }
  }
  
  module.exports = new WelcomeController();