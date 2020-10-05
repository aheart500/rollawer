import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { baseLink } from "../constants";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { UPLOAD_IMAGE, REMOVE_IMAGE, GET_IMAGES } from "../GraphQueiries";
import { ImageType } from "../types";
const useStyles = makeStyles({
  deleteButton: {
    marginLeft: "5rem",
  },
  saveButton: {
    margin: " 0 2rem",
  },
  input: {
    width: "90%",
    "& .MuiOutlinedInput-root": {
      fontFamily: '"Cairo", sans-serif',
    },
  },
});
let today = moment().format("YYYY-MM-DD");

const weekAr = [
  "الأحد",
  "الأثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

const ImagesTap = () => {
  const classes = useStyles();
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [error, setError] = useState(false);
  const { data, refetch } = useQuery(GET_IMAGES);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [day, setDay] = useState(today);
  const [upload, { loading }] = useMutation(UPLOAD_IMAGE, {
    variables: { date: day, image: newImage },
  });
  const [deleteImage] = useMutation(REMOVE_IMAGE);
  const handleDelete = (id: number) => {
    deleteImage({ variables: { id } }).then(() => refetch());
  };
  const handleUpload = () => {
    setError(false);
    if (newImage === null) {
      setError(true);
      return;
    }
    upload().then(() => {
      refetch();
      setNewImage(null);
      setUploadedImageURL("");
      setError(false);
    });
  };
  let dates: string[] = [];
  images?.forEach(({ date }) => {
    if (!dates.includes(date)) dates.push(date);
  });
  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [data]);
  const handleImageUpload = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      let reader = new FileReader();
      const image = files[0];
      reader.onloadend = () => setUploadedImageURL(reader.result as string);
      reader.readAsDataURL(image);
      setNewImage(image);
    }
  };
  return (
    <div className="state-container">
      <main className="state-body">
        <section className="state-body-section news-body">
          <h3>الصور</h3>
          <div className="new-image">
            <label
              htmlFor="image"
              className="image-label"
              style={{ backgroundImage: `url(${uploadedImageURL})` }}
            ></label>
            <input type="file" id="image" onChange={handleImageUpload} />
            <TextField
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              error={error}
            />
            <Button
              className={classes.saveButton}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleUpload}
            >
              {" "}
              رفع الصورة
            </Button>
          </div>
          {dates
            .sort()
            .reverse()
            .map((date: string) => {
              const dayName = Number(moment(date).format("e"));
              return (
                <div className="images-date" key={date}>
                  <Link
                    to={"/studio/?date=" + date}
                    target="_blank"
                    rel="noopenar noreferer"
                  >
                    <h2>
                      {weekAr[dayName]} / {date}
                    </h2>
                  </Link>
                  <div className="small-images">
                    {images
                      ?.filter((image) => image.date === date)
                      .map((image) => {
                        const imageSrc = baseLink + "/images/" + image.filename;
                        return (
                          <div className="small-image" key={image.id}>
                            <span onClick={() => handleDelete(image.id)}>
                              {" "}
                              &#10006;{" "}
                            </span>
                            <a
                              href={imageSrc}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={imageSrc} alt="uploaded" />
                            </a>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default ImagesTap;
