const { Router } = require("express");
const {
  createConversation,
  deleteConversation,
  createMessage
  ,getInfoConversation
} = require("../controllers/conversations.controller");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

// validadores
router.post("/conversations", authenticate, createConversation);


// Id de la conversacion 
router.post("/message/:id", authenticate, createMessage)


//Id de la conversacion 
router.get("/conversation/:id", authenticate, getInfoConversation)

router.delete("/conversations/:id", authenticate ,deleteConversation);


module.exports = router;