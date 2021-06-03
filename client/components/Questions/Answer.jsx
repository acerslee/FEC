import React, { useState } from "react";
import ImageModal from "./ImageModal.jsx";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
  },
  thumbnail: {
    border: "1px solid #ddd",
    borderRadius: 4,
    padding: 5,
    width: 150,
  },
  bold: {
    fontWeight: 600,
  },
}));

const Answer = ({ product_id, answer, refresh }) => {
  const classes = useStyles();
  const hasPhotos = !!answer.photos.length;
  const isSeller = answer.answerer_name.toLowerCase() === "seller";
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const dateOptions = { month: "long", day: "numeric", year: "numeric" };

  const markHelpful = () => {
    const markHelpfulUrl = `/proxy/api/fec2/hratx/qa/answers/${answer.id}/helpful`;

    axios.put(markHelpfulUrl)
      .then(() => setMarkedHelpful(true))
      .then(() => refresh(product_id))
      .catch((err) => console.error("markHelpful", err));
  };

  const report = () => {
    const reportUrl = `/proxy/api/fec2/hratx/qa/answers/${answer.id}/report`;

    axios.put(reportUrl)
    .then(() => refresh(product_id))
    .catch(err => console.error(err))
  };

  return (
    <Grid
      item
      container
      direction="column"
      spacing={0}
      className={classes.root}
    >
      <Grid item>
        <Typography style = {{fontSize: '1.1em'}}>{answer.body}</Typography>
      </Grid>
      {hasPhotos && (
        <Grid item container>
          {answer.photos.map((img) => {
            return <ImageModal imageUrl={img} key={img} />;
          })}
        </Grid>
      )}
      <Grid
        item
        style = {{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        {isSeller && (
          <Typography  className={classes.bold}>
            by Seller
          </Typography>
        )}
        {!isSeller && (
          <Typography >
            {"by " + answer.answerer_name}
          </Typography>
        )}
        <Typography >
          {" | " +
            new Date(answer.date).toLocaleDateString("en-us", dateOptions) +
            " | "}
        </Typography>
        <Typography  variant="body1">
          Helpful?{" "}
          {!markedHelpful && (
            <Link
              aria-label="qa-answer-helpfulness"
              onClick={markHelpful}
              variant="body1"
              underline="always"
              style={{ cursor: "pointer" }}
            >
              Yes
            </Link>
          )}
          {markedHelpful && (
            <Typography  variant="body1">
              {" "}
              Yes{" "}
            </Typography>
          )}{" "}
          ({answer.helpfulness}) |{" "}
          <Link
            onClick={report}
            variant="body1"
            underline="always"
            style={{ cursor: "pointer" }}
          >
            Report
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Answer;
