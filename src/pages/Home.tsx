import React, { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.location.replace("/login");
  }, []);
  return <div></div>;
};

export default Index;
