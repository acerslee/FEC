import React, { useState, useEffect } from 'react';
import API from '../../../api.js';
import { StaticRating } from '../../starRating.jsx';
import Body from './body.jsx';
import ImageModal from './ImageModal.jsx';
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

  function handleHelpful(e) {
    const review_id = e.target.getAttribute('data');

    if (!helpful.includes(review_id)) {
      setHelpful(review_id);

      API.updateHelpful(review_id, {review_id})
      .then(res => {
        API.getReviewCards({
          product_id : product_id,
          sort: document.getElementById('sort').value,
          count: 100
        })
        .then(res => setReviewCards(res.data.results))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    }
  }

  function handleReport(e) {
    const review_id = e.target.getAttribute('data');

    API.updateReport(review_id, {review_id})
    .then(res => {
      API.getReviewCards({
        product_id : product_id,
        sort: document.getElementById('sort').value,
        count: 100
      })
        .then(res => setReviewCards(res.data.results))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  const thumbnails = (
    <div className="thumbnail-container">
      {reviewCard.photos.map((photo, index) =>
        <ImageModal className={classes.testing} imageUrl={photo.url} key={photo.id}/>
      )}
    </div>
  );

  const feedback = (
    <span >
      Helpful? &nbsp;
      <a data={reviewCard.review_id} onClick={handleHelpful}>
        Yes ({ reviewCard.helpfulness })
      </a>
      &nbsp; |  &nbsp;
      <a data={reviewCard.review_id} onClick={handleReport}>
        Report
      </a>
    </span>
  );

  return (
    <div>
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
    </div>
  )
};

export default ReviewCard;
