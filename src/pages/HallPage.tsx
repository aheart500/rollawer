import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Hall from "../components/Hall";
import Heading from "../components/Heading";
import Loader from "../components/Loader";
import NewsBar from "../components/NewsBar";
import WatanyiaBox from "../components/WatanyiaBox";
import { GET_HALL, IS_AUTHENTICATED, SUBSCRIBE_HALL } from "../GraphQueiries";
import { hallType, SettingsAttributes } from "../types";

const HallPage = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { data: authentication } = useQuery(IS_AUTHENTICATED);
  const { data, loading: dataLoading, subscribeToMore } = useQuery(GET_HALL, {
    variables: { id: props.match.params.id },
  });
  const allowedToObj = (string: string) => {
    const arr = string.split(/-|=/gi);
    return {
      hall: arr[arr.indexOf("halls") + 1].split(","),
      court: arr[arr.indexOf("courts") + 1].split(","),
    };
  };
  let settings: SettingsAttributes = props.settings;
  useEffect(() => {
    if (props.mobile) {
      if (authentication) {
        if (
          authentication.me &&
          (authentication.me.isAdmin ||
            authentication.me.isAllowed ||
            (authentication.me.allowedTo &&
              allowedToObj(authentication.me.allowedTo).hall.includes(
                props.match.params.id
              )))
        ) {
          setLoading(false);
        } else {
          window.localStorage.setItem("type", "hall");
          window.localStorage.setItem("number", props.match.params.id);
          window.location.replace("/login");
        }
      }
    } else {
      setLoading(false);
    }
  }, [props, authentication]);
  useEffect(() => {
    if (data && data.hall) {
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
      <Heading />
      <div className="halls-container">
        <div className="single-hall">
          <Hall
            key={hall.id}
            hall={hall}
            officialNameSize={settings?.hall_officialNameSize}
            rollNumberSize={settings?.hall_rollNumberSize}
            specialtySize={settings?.hall_specialitySize}
            titleSize={settings?.hall_titleSize}
          />
        </div>
        <WatanyiaBox />
      </div>
      <NewsBar time={settings.newsBarTime} />
    </>
  );
};

export default HallPage;
