import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export function HoverRating() {
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return (

    <div className={classes.root} id='hover-rating' value={value}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
}

export function StaticRating(props) {

  const [value, setValue] = useState(0);

  useEffect(() => {
    let reviewData = props.data;

    if(!reviewData) setValue(0)

    let values = Object.entries(reviewData).map(e =>
      Number(e[0]) * Number(e[1]))
      .reduce((a, b) => Number(a) + Number(b), 0) /
      Object.values(reviewData).reduce((a, b) => Number(a) + Number(b), 0);
    setValue(values)

  }, [props.data])

  return (
    <div value={value || 0} >
      <Rating
        name="read-only"
        value={value} readOnly
        precision={0.25}
        size={props.size || 'medium'}
      />
    </div>
  );
}