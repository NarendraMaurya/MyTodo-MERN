const {
  registerUser,
  loginUser,
  home,
  getUser,
} = require("../controllers/userControllers");
const protect = require('../middlewares/userMiddleware')

const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/home', protect, home);
router.get("/getuser", protect, getUser);

module.exports = router;