import React from "react";
import { days as DaysType, hallType } from "../types";

const Hall = ({
  hall,
  last,
  officialNameSize,
  rollNumberSize,
  titleSize,
  specialtySize,
}: {
  hall: hallType;
  last?: boolean;
  rollNumberSize: number;
  titleSize: number;
  specialtySize: number;
  officialNameSize: number;
}) => {
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

  const dayData = hall[dayName as DaysType]
    ? hall[dayName as DaysType].split("--")
    : ["", ""];
  return (
    <div className="hall" style={{ gridColumn: last ? "span 5" : "" }}>
      <h1 style={{ fontSize: titleSize + "px" }}>رقم القاعة: {hall.number}</h1>
      <h2 className="specialty" style={{ fontSize: specialtySize + "px" }}>
        {dayData[0]}
      </h2>
      <h2 style={{ fontSize: officialNameSize + "px" }}>
        المستشار/ {dayData[1]}
      </h2>
      <h2> رقم الرول</h2>
      <p className="roll-number" style={{ fontSize: rollNumberSize + "px" }}>
        {hall.rollNumber}
      </p>
    </div>
  );
};

export default Hall;
