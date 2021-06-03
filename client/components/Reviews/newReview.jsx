import React, { useState, useEffect } from 'react';
import API from '../../../api.js';
import { HoverRating } from '../../starRating.jsx';

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import styled from 'styled-components';
import axios from 'axios';

const FieldHeader = styled(Typography)`
  font-size: 1.5em !important;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: '60%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  helperText: {
    color: "blue",
  },
}));


const NewReview = ({ product, metadata, setModal }) => {
  const classes = useStyles();
  const [modalStyle] = useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    overflow: 'scroll'
  });
  let [formValidation, setFormValidation] = useState(true)
  let [reviewImages, setReviewImages] = useState([]);
  let [base64Images, setbase64Images] = useState([]);
  let characteristicList = Object.keys(metadata.characteristics);

  function closeModal() {
    setModal(false);
  }

  function handleUploadImages(e) {
    document.getElementById('thumbnails').innerHTML = '';
    let images = [];
    let base64 = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
      getBase64(e.target.files[i])
        .then(data => {
          base64.push(data.split(',')[1]);
        });
      setbase64Images(base64);
      setReviewImages(images);
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    const rating = document.getElementById('hover-rating').getAttribute('value');
    const form = document.getElementById('newReview').elements;

    // Checks email validation
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email.value)) {
      setFormValidation(false)
      return
    }

    if (!rating) {
      alert('Please select a rating');
      return
    } else {
      setModal(false);

      let imageURLs = [];
      base64Images.forEach(photo => {
        API.uploadImages(photo)
          .then(res => {
            imageURLs.push(res.data.data.url);
          })
          .catch(err => console.error(err));
      })

      let characteristics = {};
      const charList = Object.keys(metadata.characteristics);
      charList.forEach(char => {
        const char_id = metadata.characteristics[char].id
        const value = form[char].value;
        characteristics[char_id] = Number(value);
      })

      const json = {
        product_id: product.id,
        rating: Number(rating),
        summary: form.summary.value || '',
        body: form.body.value,
        recommend: form.recommend.value === 'true' ? true : false,
        name: form.nickname.value,
        email: form.email.value,
        photos: imageURLs,
        characteristics: characteristics
      };

      axios.post('/postreview', json)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <form id="newReview" onSubmit={handleSubmitReview}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <FieldHeader variant="h3">Overall Rating
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
          </Grid>
          <Grid item>
            <HoverRating size="large"/>
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Do you recommend this product?
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup name="recommend" row={true}>
                <FormControlLabel
                  value="true"
                  control={<Radio required />}
                  label={<FieldHeader variant="h3">Yes</FieldHeader>}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio required/>}
                  label={<FieldHeader variant="h3">No</FieldHeader>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FieldHeader variant="h3" style={{marginBottom: '10px'}}>Characteristics
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
            {characteristicList.map((char, index) => (
                <div key={index}>
                  <FieldHeader variant="h3">{char}:</FieldHeader>
                  <FormControl component="fieldset">
                    <RadioGroup name={char} row={true} >
                      <FormControlLabel value="1" control={<Radio required/>} label={1}/>
                      <FormControlLabel value="2" control={<Radio required/>} label={2}/>
                      <FormControlLabel value="3" control={<Radio required/>} label={3}/>
                      <FormControlLabel value="4" control={<Radio required/>} label={4}/>
                      <FormControlLabel value="5" control={<Radio required/>} label={5}/>
                    </RadioGroup>
                  </FormControl>
                </div>
              )
            )}
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Review Summary:</FieldHeader>
            <TextField
              name="summary"
              variant="outlined"
              inputProps={{style: {fontSize: 18, fontWeight: 'bold'}, maxLength: '60'}}
              style={{width: '80%', marginBottom: '7px'}}
            />
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Review Body:
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
            <TextField
              name="body"
              multiline
              variant='outlined'
              inputProps={{style: {fontSize: 14}, maxLength: '1000'}}
              style={{width: '80%'}}
              required
            />
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Nickname:
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
            <TextField
              name="nickname"
              id="nickname"
              variant='outlined'
              inputProps={{style: {fontSize: 18, maxLength: '60'}}}
              style={{width: '80%'}}
              required
            />
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Email:
              <FieldHeader variant="inherit" style={{color: 'red'}}>*</FieldHeader>
            </FieldHeader>
            <TextField
              name="email"
              id="email"
              variant='outlined'
              inputProps={{style: {fontSize: 18, maxLength: '60'}}}
              style={{width: '80%'}}
              error={!formValidation}
              helperText={!formValidation && 'Please enter a valid email'}
              required
            />
          </Grid>
          <Grid item>
            <FieldHeader variant="h3">Upload Images:</FieldHeader>
            <input type="file" name="photos" onChange={handleUploadImages} accept="image/*" multiple />
            <div id="thumbnails">
              {reviewImages.map(image =>
                <img
                  src={image}
                  key={image}
                  width="60px"
                  height="60px"
                  style={{margin: "5px", border: "2px solid grey"}}>
                </img>)}
            </div>
          </Grid>
          <Grid item>
            <Button type="submit" color="primary" variant="outlined" size="large" aria-label = "Submit">
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default NewReview;
