import React from 'react';
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

function HoverRating() {
  const [value, setValue] = React.useState(null);
  const [hover, setHover] = React.useState(-1);
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

function StaticRating(props) {
  let reviewData = props.data;

  let values = Object.entries(reviewData).map(e =>
    Number(e[0]) * Number(e[1]))
    .reduce((a, b) => Number(a) + Number(b), 0) /
    Object.values(reviewData).reduce((a, b) => Number(a) + Number(b), 0);

  const [value, setValue] = React.useState(values);

  return (
    <>
    {value &&
      <div value={value}>
        <Rating
          name="read-only"
          value={value} readOnly
          precision={0.25}
          size={props.size || 'medium'}
        />
      </div>
      }
    </>
  );
}

export{
  HoverRating,
  StaticRating
}
