import { useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { GET_IMAGES } from "../GraphQueiries";
import { ImageType } from "../types";
import { baseLink } from "../constants";
const weekAr = [
  "الأحد",
  "الأثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const Images = ({ location: { search } }: RouteComponentProps) => {
  const searchParams = search.split(/\?|=|&/);
  const date = searchParams[searchParams.indexOf("date") + 1];
  const { data } = useQuery(GET_IMAGES, { variables: { date } });
  const dayName = Number(moment(date).format("e"));
  return (
    <div className="images-container">
      <h1>
        {weekAr[dayName]} / {date}
      </h1>
      <div>
        {data?.images.map((image: ImageType) => {
          const imageSrc = baseLink + "/images/" + image.filename;

          return (
            <div className="big-image" key={image.id}>
              <a href={imageSrc} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt="uploaded" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Images;
