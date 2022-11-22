const asyncHandler = require("express-async-handler");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({ user: req.user.id });
  res.status(200).json(cards);
});

const setCard = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const card = await Card.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(card);
});

const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user.id) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the card user
  if (card.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to get private data");
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);
  if (!card) {
    res.status(400);
    throw new Error("Card not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the card user
  if (card.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to get private data");
  }

  await card.remove();

  res.status(200).json({ id: req.params.id, desc: "Card is deleted" });
});

module.exports = {
  getCards,
  setCard,
  updateCard,
  deleteCard,
};
