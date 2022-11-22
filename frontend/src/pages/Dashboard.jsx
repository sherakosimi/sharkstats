import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CardForm from "../components/CardForm";
import CardItem from "../components/CardItem";
import Spinner from "../components/Spinner";
import { getCards, reset } from "../features/cards/cardSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cards, isLoading, isError, message } = useSelector(
    (state) => state.cards
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getCards());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <CardForm />

      <section className="content">
        {cards.length > 0 ? (
          <div className="goals">
            {cards.map((card) => (
              <CardItem key={card._id} card={card} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
