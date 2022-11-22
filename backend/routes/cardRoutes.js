const express = require("express");
const router = express.Router();
const {
  getCards,
  setCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCards).post(protect, setCard); //combined requests getCards and setCard(create a card)
router.route("/:id").delete(protect, deleteCard).put(protect, updateCard); //comgined requests deleteCard and updateCard

module.exports = router;
