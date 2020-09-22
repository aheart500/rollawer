import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { GET_HALL, SUBSCRIBE_HALL, UPDATE_ROLLNUMBER } from "../GraphQueiries";
import { hallType } from "../types";

const Counter = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { data, loading: dataLoading, subscribeToMore } = useQuery(GET_HALL, {
    variables: { id: props.match.params.id },
  });
  const [updateRollNumber] = useMutation(UPDATE_ROLLNUMBER);
  const updateRoll = (number: number) => {
    updateRollNumber({
      variables: {
        hallId: data.hall.id,
        number,
      },
    });
  };
  useEffect(() => {
    if (props.mobile) {
      const logged = localStorage.getItem("logged");
      if (logged !== "user" && logged !== "admin") {
        window.location.replace(
          `/login?type=hall&number=${props.match.params.id}`
        );
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [props]);
  useEffect(() => {
    if (data && data.hall) {
      console.log("hi");
      subscribeToMore({
        document: SUBSCRIBE_HALL,
        variables: { hallId: data.hall.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newRollNumber = subscriptionData.data.rollNumber;
          return {
            ...prev,
            hall: { ...prev.hall, rollNumber: newRollNumber },
          };
        },
      });
    }
  }, [data, subscribeToMore]);
  if (loading || dataLoading) {
    return <Loader />;
  }
  if (!data || !data.hall) {
    return <h1>لا توجد قاعة بهذا الرقم</h1>;
  }

  let hall: hallType = data.hall;
  return (
    <>
      <div className="counter">
        <button
          className="counter-button up-button"
          onClick={() => updateRoll(hall.rollNumber + 1)}
        >
          <svg
            width="110px"
            height="110px"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"></path>
          </svg>
        </button>
        <div className="rollNumber-counter">
          <p>{hall.rollNumber}</p>
        </div>
        <button
          onClick={() => updateRoll(hall.rollNumber - 1)}
          className="counter-button down-button"
          disabled={hall.rollNumber === 0}
        >
          <svg
            width="110px"
            height="110px"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"></path>
          </svg>
        </button>
      </div>
      <button
        onClick={() => updateRoll(0)}
        className="counter-button reset-button"
        disabled={hall.rollNumber === 0}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"
          ></path>
          <path
            fillRule="evenodd"
            d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"
          ></path>
        </svg>
      </button>
    </>
  );
};

export default Counter;
