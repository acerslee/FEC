import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  helperText: {
    color: "blue",
  },
}));

const AddAnswer = ({ product_id, question_id, question, refresh }) => {
  const classes = useStyles();
  const [modalStyle] = useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ question_id: question_id });
  let [images, setImages] = useState([]);
  let [base64Images, setbase64Images] = useState([]);
  const [formValidation, setFormValidation] = useState({
    body: [false, null],
    name: [false, null],
    email: [false, null],
  });

  const handleOpen = () => {
    setOpen(true);
  };

  var handleClose = () => {
    setOpen(false);
    setbase64Images([]);
    setImages([]);
  };

  const verifyEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (verifyEmail(formData.email)) {
      let imagePromises = [];
      let formDataWithPhotos = JSON.parse(JSON.stringify(formData));

      base64Images.forEach((photo) => {
        axios.post('/upload_images',photo)
          .then(res => {
            imagePromises.push(res.data)
          })
          .catch(err => console.error(err))
      });

      Promise.all(imagePromises)
        .then((responses) => {
          return responses.map((response) => {
            return response.data.data.url;
          });
        })
        .then((imageUrls) => {
          formDataWithPhotos.photos = imageUrls;
          setFormData(formDataWithPhotos);
        })
        .then(() => {
          const postAnswerUrl = `/proxy/api/fec2/hratx/qa/questions/${formDataWithPhotos.question_id}/answers`;

          axios.post(postAnswerUrl, formDataWithPhotos)
            .then(res => console.log(res))
            .catch(err => console.error(err))
        })
        .then(() => {
          setOpen(false);
          refresh(product_id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFormValidation({
        ...formValidation,
        email: [true, "Please enter a valid email address"],
      });
    }
  };

  const handleChange = (prop, target, charLimit) => {
    if (target.value.length > charLimit) {
      target.value = target.value.slice(0, charLimit);
      let newFormValidation = JSON.parse(JSON.stringify(formValidation));
      newFormValidation[prop][1] = "Character Limit Reached";
      setFormValidation(newFormValidation);
    } else {
      let newFormValidation = JSON.parse(JSON.stringify(formValidation));
      for (const prop in newFormValidation) {
        newFormValidation[prop][1] = false;
      }
      if (verifyEmail(formData.email)) {
        newFormValidation.email[0] = false;
        newFormValidation.email[1] = null;
      }
      setFormValidation(newFormValidation);
      let newFormData = JSON.parse(JSON.stringify(formData));
      newFormData[prop] = target.value;
      setFormData(newFormData);
    }
  };

  function handleUpload(e) {
    document.getElementById("thumbnails").innerHTML = "";
    let images = [];
    let base64 = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
      getBase64(e.target.files[i]).then((data) => {
        base64.push(data.split(",")[1]);
      });
      setbase64Images(base64);
      setImages(images);
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h3">Submit your Answer</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">{question}</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <InputLabel htmlFor="add-answer-answer">Answer*</InputLabel>
                <TextField
                  id="add-answer-answer"
                  variant="outlined"
                  FormHelperTextProps={{ className: classes.helperText }}
                  helperText={
                    <Typography  variant="body1">
                      {formValidation.body[1]}
                    </Typography>
                  }
                  onChange={(e) => handleChange("body", e.target, 1000)}
                  multiline={true}
                  rows={4}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item>
                <InputLabel color="primary" htmlFor="add-answer-name">
                  Name*
                </InputLabel>
                <Typography  variant="body1">
                  <Box fontStyle="italic">
                    For privacy reasons, do not use your full name or email
                    address
                  </Box>
                </Typography>
                <TextField
                  id="add-answer-name"
                  variant="outlined"
                  FormHelperTextProps={{ className: classes.helperText }}
                  helperText={
                    <Typography  variant="body1">
                      {formValidation.name[1]}
                    </Typography>
                  }
                  onChange={(e) => handleChange("name", e.target, 60)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item>
                <InputLabel color="primary" htmlFor="photos-input">
                  Photos
                </InputLabel>
                <Button color="primary" variant="outlined" component="label" aria-label = 'upload-image'>
                  Upload
                  <input
                    type="file"
                    id="photos-input"
                    onChange={handleUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                    multiple
                    hidden
                  />
                </Button>
              </Grid>
              <Grid item>
                <div id="thumbnails">
                  {images.map((image) => (
                    <img
                      src={image}
                      key={image}
                      width="60px"
                      height="60px"
                      style={{ margin: "5px", border: "2px solid grey" }}
                    ></img>
                  ))}
                </div>
              </Grid>
              <Grid item>
                <InputLabel htmlFor="add-answer-email">Email*</InputLabel>
                <Typography  variant="body1">
                  <Box fontStyle="italic">
                    For authentication reasons, you will not be emailed
                  </Box>
                </Typography>
                <TextField
                  id="add-answer-email"
                  variant="outlined"
                  FormHelperTextProps={{ className: classes.helperText }}
                  helperText={
                    <Typography  variant="body1">
                      {formValidation.email[1]}
                    </Typography>
                  }
                  onChange={(e) => handleChange("email", e.target, 60)}
                  error={formValidation.email[0]}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button type="submit" color="primary" variant="outlined" aria-label = 'add-answer'>
                  ADD
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Link
        onClick={handleOpen}
        underline="always"
        style={{ cursor: "pointer", fontSize: '1em' }}
      >
        Add Answer
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-answer-title"
      >
        {body}
      </Modal>
    </>
  );
};

export default AddAnswer;
