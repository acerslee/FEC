import React, { useState, useEffect } from 'react';
import ReviewCard from './reviewCard.jsx';
import Ratings from './ratings.jsx';
import NewReview from './newReview.jsx';
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import NativeSelect from '@material-ui/core/NativeSelect';
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    maxWidth: '80vw',
  }
}));

const Reviews = ({ product_id, currentProduct, productMetadata }) => {
  let [reviewCards, setReviewCards] = useState([]);
  let [count, updateCount] = useState(2);
  let [modal, setModal] = useState(false);
  const classes = useStyles();

  function fetchReviews(sort) {
    const reviewUrl = `/proxy/api/fec2/hratx/reviews/?product_id=${product_id}&sort=${sort}&count=100`;

    axios.get(reviewUrl)
    .then(res => {
      setReviewCards(res.data.results);
    })
    .catch(err => console.error(err));
  }

  function handleSort(e) {
    fetchReviews(e.target.value);
  }

  function loadMore() {
    updateCount(count + 2);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  useEffect(() => {
    fetchReviews('relevant');
  }, [product_id]);

  return (
    <div id = 'reviews-section' style = {{paddingBottom: '10rem'}}>
      <Box elevation={0} className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography style={{marginLeft: "10px", fontSize: '1.5em'}}>
              RATINGS & REVIEWS
            </Typography>
          </Grid>
          <Grid container item xs={4} style={{maxHeight: '800px', overflow: "hidden"}}>
            {productMetadata && <Ratings metadata={productMetadata} reviewCards={reviewCards}/>}
          </Grid>
          <Grid container item xs={8}>
            <Grid item xs={12} style={{fontSize: '20px'}}>
              {reviewCards.length} reviews, sort by &nbsp;
              <NativeSelect id="sort" onChange={handleSort} style={{fontSize: '20px'}}>
                <option value="relevant">relevant</option>
                <option value="helpful">helpful</option>
                <option value="newest">newest</option>
              </NativeSelect>
            </Grid>
            <Grid
              container
              item
              style={{
                height: '400px',
                maxHeight: '400px',
                overflow: 'scroll',
                overflowX: 'hidden'
              }}
            >
              {reviewCards.slice(0, count).map(card =>
                <ReviewCard
                  key={card.review_id}
                  reviewCard={card}
                  setReviewCards={setReviewCards}
                  product_id={product_id}
                />)}
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{marginTop: '.5vw'}}
                onClick={openModal}
                aria-label = "Add-review"
              >
                Add A Review
              </Button>
            </Grid>
            <Grid item xs={4}>
              {reviewCards.length > count &&
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{marginTop: '.5vw'}}
                onClick={loadMore}
                aria-label = "Load-review"
              >
                Load More
              </Button>}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Modal open={modal} onClose={closeModal} aria-labelledby="add-question-title">
        <NewReview setModal={setModal} product={currentProduct} metadata={productMetadata} />
      </Modal>
    </div>
    )
};

export default Reviews;
