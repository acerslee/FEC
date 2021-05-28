import React, { useState } from "react";
import Answer from "./Answer";
import AddAnswer from "./AddAnswer";
import API from "../../../api";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 10,
    paddingBottom: 0,
  },
  bold: {
    fontWeight: 600,
  },
  highlighted: {
    fontWeight: 600,
    backgroundColor: "yellow",
  },
}));

const Question = ({ product_id, question, searchTerm, refresh }) => {
  const [answersToShow, setAnswersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const classes = useStyles();

  var answers = Object.entries(question.answers)
    .map((a) => a[1])
    .sort((a, b) => (a.helpfulness > b.helpfulness ? -1 : 1))
    .sort((a, b) => {
      if (a.answerer_name.toLowerCase() === "seller") {
        return -1;
      }
      if (b.answerer_name.toLowerCase() === "seller") {
        return 1;
      }
    });

  const showMore = () => {
    expanded ? setAnswersToShow(2) : setAnswersToShow(answers.length);
    setExpanded(!expanded);
  };

  const markHelpful = () => {
    API.markQuestionHelpful(question.question_id)
      .then(() => setMarkedHelpful(true))
      .then(() => refresh(product_id))
      .catch((err) => console.log("markHelpful", err));
  };

  return (
    <Box elevation={0}>
      <Grid container spacing={1} className={classes.root}>
        <Grid
          item
          xs={1}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography variant="h3" className={classes.bold}>
            Q:
          </Typography>
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between"
          }}
        >
          <p style = {{fontSize: '1.5em'}}>{question.question_body}</p>
          <Typography style = {{fontSize: '1.1em'}}>
            Helpful?{" "}
            {!markedHelpful && (
              <Link
                aria-label="qa-question-helpfulness"
                onClick={markHelpful}
                underline="always"
                style={{
                  cursor: "pointer"
                }}
              >
                Yes
              </Link>
            )}
            {markedHelpful && (
              <Typography style = {{fontSize: '1em'}}>
                {" "}
                Yes{" "}
              </Typography>
            )}{" "}
            ({question.question_helpfulness}) |{" "}
            <AddAnswer
              product_id={product_id}
              question_id={question.question_id}
              question={question.question_body}
              refresh={refresh}
            />
          </Typography>
        </Grid>
        {!!answers.length && (
          <Grid item container direction="row" spacing={1}>
            <Grid
              item
              xs={1}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography variant="h3" className={classes.bold}>
                A:
              </Typography>
            </Grid>
            <Grid item container direction="column" spacing={1} xs={11}>
              {answers.slice(0, answersToShow).map((a) => {
                return (
                  <Answer
                    product_id={product_id}
                    answer={a}
                    key={a.id}
                    refresh={refresh}
                  />
                );
              })}
            </Grid>
          </Grid>
        )}
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          {answers.length > 2 ? (
            <Link
              color="primary"
              onClick={showMore}
              variant="h4"
              underline="none"
              style={{ cursor: "pointer", fontSize: '1.1em' }}
            >
              {expanded ? "COLLAPSE ANSWERS" : "SEE MORE ANSWERS"}
            </Link>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Question;