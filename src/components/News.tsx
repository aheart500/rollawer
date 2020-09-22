import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { ADD_NEWS, REMOVE_NEWS, GET_NEWS } from "../GraphQueiries";
import { NewsType } from "../types";
const useStyles = makeStyles({
  deleteButton: {
    marginLeft: "5rem",
  },
  saveButton: {
    marginLeft: "1rem",
    height: "50px",
  },
  input: {
    width: "90%",
    "& .MuiOutlinedInput-root": {
      fontFamily: '"Cairo", sans-serif',
    },
  },
});
const News = () => {
  const classes = useStyles();
  const [news, setNews] = useState<NewsType[] | null>(null);
  const [error, setError] = useState(false);
  const { data, refetch } = useQuery(GET_NEWS);
  const [newNews, setNewNews] = useState("");
  const [saveNew, { loading }] = useMutation(ADD_NEWS, {
    variables: { text: newNews },
  });
  const [deleteNews] = useMutation(REMOVE_NEWS);
  const handleDelete = (id: number) => {
    deleteNews({ variables: { id } }).then(() => refetch());
  };
  const handleSaveNew = () => {
    setError(false);
    if (newNews === "") {
      setError(true);
      return;
    }
    saveNew().then(() => {
      refetch();
      setNewNews("");
      setError(false);
    });
  };

  useEffect(() => {
    if (data) setNews(data.news);
  }, [data]);

  return (
    <div className="state-container">
      <main className="state-body">
        <section className="state-body-section news-body">
          <h3>الأخبار:</h3>
          {news?.map((newsayia: NewsType) => (
            <div className="new-news" key={newsayia.id}>
              {newsayia.text}
              <Button
                className={classes.deleteButton}
                color="secondary"
                variant="contained"
                onClick={() => handleDelete(newsayia.id)}
              >
                حذف الخبر
              </Button>
            </div>
          ))}
          <div className="new-news">
            <TextField
              value={newNews}
              onChange={(e) => setNewNews(e.target.value)}
              variant="outlined"
              placeholder="خبر جديد"
              className={classes.input}
              multiline={true}
              error={error}
            />
            <Button
              className={classes.saveButton}
              color="primary"
              variant="outlined"
              disabled={loading}
              onClick={handleSaveNew}
            >
              {loading ? "جاري الحفظ" : "إضافة الخبر"}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;
