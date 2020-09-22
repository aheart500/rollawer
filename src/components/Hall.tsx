import React from "react";
import { days as DaysType, hallType } from "../types";

const Hall = ({ hall }: { hall: hallType }) => {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let d = new Date();
  let dayName = days[d.getDay()];
  return (
    <div className="hall">
      <h1>رقم القاعة: {hall.number}</h1>
      <h2 className="specialty"> {hall[dayName as DaysType]}</h2>
      <h2>المستشار/ {hall.official}</h2>
      <h2> رقم الرول</h2>
      <p className="roll-number">{hall.rollNumber}</p>
    </div>
  );
};

export default Hall;
