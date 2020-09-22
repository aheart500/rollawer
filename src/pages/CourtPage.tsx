import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import Hall from "../components/Hall";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import NewsBar from "../components/NewsBar";
import WatanyiaBox from "../components/WatanyiaBox";
import { GET_HALLS, IS_AUTHENTICATED, SUBSCRIBE_HALL } from "../GraphQueiries";
import { hallType } from "../types";

const CourtPage = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { data, loading: dataLoading, subscribeToMore } = useQuery(GET_HALLS, {
    variables: { CourtId: props.match.params.id },
  });
  const { data: authentication } = useQuery(IS_AUTHENTICATED);
  const listenForHall = useCallback(
    (hallId: number) => {
      subscribeToMore({
        document: SUBSCRIBE_HALL,
        variables: { hallId },
        updateQuery: (prev, { subscriptionData }) => {
          const newRollNumber = subscriptionData.data.rollNumber;
          const newHalls = prev.halls.map((hall: any) => {
            if (hall.id === hallId)
              return { ...hall, rollNumber: newRollNumber };
            return hall;
          });
          return {
            ...prev,
            halls: newHalls,
          };
        },
      });
    },
    [subscribeToMore]
  );
  useEffect(() => {
    if (data) {
      data.halls.forEach((hall: any) => listenForHall(hall.id));
    }
  }, [data, listenForHall]);
  const allowedToObj = (string: string) => {
    const arr = string.split(/-|=/gi);
    return {
      hall: arr[arr.indexOf("halls") + 1].split(","),
      court: arr[arr.indexOf("courts") + 1].split(","),
    };
  };

  useEffect(() => {
    if (props.mobile) {
      if (authentication) {
        if (
          authentication.me &&
          (authentication.me.isAdmin ||
            authentication.me.isAllowed ||
            (authentication.me.allowedTo &&
              allowedToObj(authentication.me.allowedTo).court.includes(
                props.match.params.id
              )))
        ) {
          setLoading(false);
        } else {
          window.localStorage.setItem("type", "court");
          window.localStorage.setItem("number", props.match.params.id);
          window.location.replace("/login");
        }
      }
    } else {
      setLoading(false);
    }
  }, [props, authentication]);
  if (loading || dataLoading) {
    return <Loader />;
  }
  if (!data || !data.courts) {
    return <h1>لا توجد محكمة بهذا الرقم</h1>;
  }

  return (
    <>
      <Heading />
      <div className="halls-container">
        <div
          className="court"
          style={{ paddingTop: data.halls.length === 1 ? "7rem" : "initial" }}
        >
          {data.halls.map((hall: hallType) => {
            return <Hall key={hall.id} hall={hall} />;
          })}
        </div>
        <WatanyiaBox />
      </div>
      <NewsBar />
    </>
  );
};

export default CourtPage;
