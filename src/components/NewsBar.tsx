import { useQuery } from "@apollo/client";
import React from "react";
import { GET_NEWS } from "../GraphQueiries";
import { NewsType } from "../types";
import moment from "moment";
import Clock from "react-live-clock";
import logo from "../assets/neqaba.png";

const months = [
  "يناير",
  "فبراير",
  "مارس",
  "ابريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر",
];
const weekAr = [
  "الأحد",
  "الأثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const dayName = Number(moment().format("e"));
const month = Number(moment().format("M")) - 1;
const dayDate = moment().format("DD");
const year = Number(moment().format("YYYY"));
const NewsBar = ({ time }: { time: number }) => {
  const { data } = useQuery(GET_NEWS);

  return (
    <div className="news-bar-container">
      <div className="whole-bar">
        <div className="clock">
          <Clock format={"H:mm:ss"} ticking={true} />
          <p>{`${weekAr[dayName]} ${dayDate} ${months[month]} ${year}`}</p>
        </div>
        <div
          className="news-bar"
          style={{
            animationDuration: time + "s",
          }}
        >
          {data?.news.map((newsayaia: NewsType) => {
            return (
              <p className="single-news" key={newsayaia.id}>
                {newsayaia.text}
                <img
                  alt="Rollawer"
                  style={{ margin: "0 30px" }}
                  width="28"
                  height="28"
                  src={logo}
                />
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsBar;
