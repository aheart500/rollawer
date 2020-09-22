import { useQuery } from "@apollo/client";
import React from "react";
import { GET_NEWS } from "../GraphQueiries";
import { NewsType } from "../types";
import moment from "moment";
import Clock from "react-live-clock";
import logo from "../assets/neqaba.png";
const NewsBar = () => {
  const { data } = useQuery(GET_NEWS);

  return (
    <div className="news-bar-container">
      <div className="whole-bar">
        <div className="clock">
          <Clock format={"H:mm:ss"} ticking={true} /> -{" "}
          {moment().locale("ar").format("YYYY/MM/DD")}
        </div>

        <div
          className="news-bar"
          style={{
            animationDuration:
              data?.news.reduce(
                (t: number, n: NewsType) => t + n.text.length / 5,
                30
              ) + "s",
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
