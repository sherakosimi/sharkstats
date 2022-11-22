import axios from "axios";

const API_URL = "/api/cards/";

// Create new goal
const createCard = async (cardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, cardData, config);

  return response.data;
};

// Get user goals
const getCards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user goal
const deleteCard = async (cardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + cardId, config);

  return response.data;
};

const cardService = {
  createCard,
  getCards,
  deleteCard,
};

export default cardService;
