class HomeController {
    // [GET] /home
    index(req, res) {
      res.send("home page")
    }
  }
  
  module.exports = new HomeController();