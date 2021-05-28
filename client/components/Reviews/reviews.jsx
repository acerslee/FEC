import React, { useState, useEffect } from 'react';
import ReviewCard from './reviewCard.jsx';
import Ratings from './ratings.jsx';
import NewReview from './newReview.jsx';
import API from '../../../api.js';

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

const Reviews = ({ product_id }) => {
  let [product, setProduct] = useState();
  let [reviewCards, setReviewCards] = useState([]);
  let [metadata, setMetadata] = useState();
  let [count, updateCount] = useState(2);
  let [modal, setModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchProductInfo()
    fetchReviews('relevant');
    fetchMetadata();
  }, [product_id]);

  function fetchProductInfo() {
    API.getProduct(product_id)
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => console.log(err));
  }

  function fetchReviews(sort) {
    API.getReviewCards({
      product_id : product_id,
      sort: sort,
      count: 100
    })
    .then(res => {
      setReviewCards(res.data.results);
    })
    .catch(err => console.log(err));
  }

  function fetchMetadata() {
    API.getMetadata({ product_id })
    .then(res => {
      setMetadata(res.data);
    })
    .catch(err => console.log(err));
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

  return (
    <div id = 'reviews-section' style = {{paddingBottom: '10rem'}}>
      <Box elevation={0} className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{marginLeft: "10px"}}>
              RATINGS & REVIEWS
            </Typography>
          </Grid>
          <Grid container item xs={4} style={{maxHeight: '800px', overflow: "scroll"}}>
            {metadata && <Ratings metadata={metadata} reviewCards={reviewCards}/>}
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
            <Grid container item style={{height: '400px', maxHeight: '400px', overflow: "scroll"}}>
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
                onClick={openModal}>
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
                onClick={loadMore}>
                Load More
              </Button>}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Modal open={modal} onClose={closeModal} aria-labelledby="add-question-title">
        <NewReview setModal={setModal} product={product} metadata={metadata} />
      </Modal>
    </div>
    )
};

export default Reviews;
