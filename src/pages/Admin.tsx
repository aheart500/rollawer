import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_STATES, IS_AUTHENTICATED } from "../GraphQueiries";
import StatesDrawer from "../components/StatesDrawer";
import StateBody from "../components/StateBody";
import { StateType } from "../types";
import News from "../components/News";
import Users from "../components/Users";
import ImagesTap from "../components/ImagesTap";
export type taps = "users" | "news" | "images";
const Admin = () => {
  const [loading, setLoading] = useState(true);
  const { data, refetch } = useQuery(GET_STATES);
  const [states, setStates] = useState([]);
  const [selectedTap, setSelectedTap] = useState<taps | null>(null);
  const [selectedState, setSelectedState] = useState<StateType | null>(null);
  const { data: authentication } = useQuery(IS_AUTHENTICATED);
  const handleRefetch = () => {
    refetch().then((res) => {
      if (res.data) setStates(res.data.states);
    });
  };
  useEffect(() => {
    setStates(data?.states);
  }, [data]);

  useEffect(() => {
    if (authentication) {
      if (authentication.me && authentication.me.isAdmin) {
        setLoading(false);
      } else {
        window.location.replace("/login");
      }
    }
  }, [authentication]);

  if (loading || !data) {
    return <Loader />;
  }
  const handleSelectTap = (tap: taps) => {
    setSelectedTap(tap);
    setSelectedState(null);
  };
  const handleSelectState = (state: StateType) => {
    setSelectedTap(null);
    setSelectedState(state);
  };
  return (
    <div className="admin-container">
      <StatesDrawer
        refecth={handleRefetch}
        handleSelectTap={handleSelectTap}
        handleSelectState={handleSelectState}
        states={states || []}
      />
      <header className="state-header"></header>
      {selectedTap === "users" && <Users />}
      {selectedTap === "news" && <News />}
      {selectedTap === "images" && <ImagesTap />}
      {selectedState && (
        <StateBody
          state={selectedState}
          refecth={handleRefetch}
          setSelectedState={setSelectedState}
        />
      )}
    </div>
  );
};

export default Admin;
