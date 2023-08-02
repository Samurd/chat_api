const { Router } = require("express");
const { createUser, loginUser, allUsers, getConversationByUserId } = require("../controllers/users.controllers")
const { loginUserValidator, registerUserValidator } = require("../validators/users.validator");
const authenticate = require("../middlewares/auth.middleware")

const router = Router();

router.post("/register", registerUserValidator, createUser);


router.post("/login", loginUserValidator, loginUser);

router.get("/users", authenticate, allUsers)

router.get("/userconversation/:id", authenticate, getConversationByUserId)


module.exports = router;

