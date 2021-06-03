import React, { useState, useEffect } from 'react';
import { StaticRating } from '../../starRating.jsx';
import Body from './body.jsx';
import ImageModal from './ImageModal.jsx';
import axios from 'axios';
var moment = require('moment');

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  reviewCard: {
    width: '100%',
    margin: '10px',
    padding: '5px',
    borderBottom: '2px solid black'
  }
}));

const ReviewCard = ({ reviewCard, setReviewCards, product_id }) => {
  const classes = useStyles();
  const date = moment(reviewCard.date, 'YYYY-MM-DD').format('MMMM D, YYYY');
  const [helpful, setHelpful] = useState([]);

  const reviewCardUrl = `/proxy/api/fec2/hratx/reviews/?product_id=${product_id}&sort=${document.getElementById('sort').value}&count=100`;

  function handleHelpful(e) {
    const review_id = e.target.getAttribute('data');

    if (!helpful.includes(review_id)) {
      setHelpful(review_id);
      const helpfulClickUrl = `/proxy/api/fec2/hratx/reviews/${review_id}/helpful`;

      axios.put(helpfulClickUrl)
      .catch(err => console.error(err))
      .then(() => {
        return axios.get(reviewCardUrl)
      })
      .then(res => setReviewCards(res.data.results))
      .catch(err => console.error(err));
    }
  }

  function handleReport(e) {
    const review_id = e.target.getAttribute('data');
    const reportClickUrl = `/proxy/api/fec2/hratx/reviews/${review_id}/report`;
      axios.put(reportClickUrl)
      .catch(err => console.error(err))
      .then(() => {
        return axios.get(reviewCardUrl)
      })
      .then(res => setReviewCards(res.data.results))
      .catch(err => console.error(err));
  }

  const thumbnails = (
    <div className="thumbnail-container">
      {reviewCard.photos.map((photo, index) =>
        <ImageModal className={classes.testing} imageUrl={photo.url} key={photo.id}/>
      )}
    </div>
  );

  const feedback = (
    <>
      Helpful? &nbsp;
      <a data={reviewCard.review_id} onClick={handleHelpful}>
        Yes ({ reviewCard.helpfulness })
      </a>
      &nbsp; |  &nbsp;
      <a data={reviewCard.review_id} onClick={handleReport}>
        Report
      </a>
    </>
  );

  return (
    <>
      <Grid container item spacing={1} xs={12} className={classes.reviewCard} id={reviewCard.review_id}>
        <Grid item xs={6}>
          <StaticRating data={{[reviewCard.rating]: 1}} />
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          {reviewCard.reviewer_name} | {date}
        </Grid>
        <Grid item xs={12} style={{fontWeight: 'bold'}}>
          {reviewCard.summary}
        </Grid>
        <Grid item xs={12}>
          <Body body={reviewCard.body} id={reviewCard.review_id} />
        </Grid>
        {!!reviewCard.photos.length &&
        <Grid item xs={12}>
          {thumbnails}
        </Grid>}
        {!!reviewCard.response &&
        <Grid item xs={12} style={{
          background: 'radial-gradient(circle, rgba(187,187,187,1) 0%, rgba(172,172,172,1) 100%)', padding: '20px',
          borderRadius: '15px',
          margin: '5px'
        }}>
          <b>Response:</b><br/>
          {reviewCard.response}
        </Grid>}
        <Grid item xs={6}>
          {feedback}
        </Grid>
        {!!reviewCard.recommend &&
        <Grid item xs={6} style={{textAlign: 'right', fontWeight: 'bold'}}>
          <CheckIcon fontSize="large" style={{transform: 'translate(0px, 6px)'}}/>I recommend this product!
        </Grid>}
      </Grid>
    </>
  )
};

export default ReviewCard;
