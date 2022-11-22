import { useDispatch } from "react-redux";
import { deleteCard } from "../features/cards/cardSlice";

function CardItem({ card }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(card.createdAt).toLocaleString("en-US")}</div>
      <h2>{card.text}</h2>
      <button onClick={() => dispatch(deleteCard(card._id))} className="close">
        X
      </button>
    </div>
  );
}

export default CardItem;
