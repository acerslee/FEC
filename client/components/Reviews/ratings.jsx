import React from 'react';
import CharBreakdown from './charBreakdown.jsx';
import { StaticRating } from '../../starRating.jsx';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Ratings = ({ metadata, reviewCards }) => {
  let totalReviews = 0, recommend = 0;

  reviewCards.forEach(card => {
    if (card.recommend) {
      recommend++;
    }
    totalReviews++;
  });

  const percentage = Math.round(100 * (recommend / totalReviews)) || 0;
  const totalRatings = Object.values(metadata.ratings).reduce((a, b) => Number(a) + Number(b));
  const stars5 = starBarFill(5);
  const stars4 = starBarFill(4);
  const stars3 = starBarFill(3);
  const stars2 = starBarFill(2);
  const stars1 = starBarFill(1);
  const allStars = [stars5, stars4, stars3, stars2, stars1]

  const overallRating = Object.entries(metadata.ratings)
    .map(e => Number(e[0]) * Number(e[1]))
    .reduce((a, b) => Number(a) + Number(b), 0) / totalRatings;

  function starBarFill(n) {
    return metadata.ratings[n] ? Math.round( 100 * ( Number(metadata.ratings[n]) / totalRatings ) ) : 0;
  }

  return (
    <>
      <Grid item container>
        <Grid item xs={6} style={{fontSize: '60px', fontWeight: 'bold', textAlign: 'center'}}>
          {overallRating.toFixed(1)}
        </Grid>
        <Grid item xs={6} style={{fontSize: '50px'}}>
          <StaticRating data={metadata.ratings} size="large"/>
        </Grid>
        <Grid item xs={12} style={{fontSize: '14px', fontWeight: 600, textAlign: 'center', letterSpacing: '0px'}}>
          {percentage}% of reviews recommend this product
        </Grid>
        {allStars.map((star, index) => (
          <Grid container item key={index}>
            <Grid item xs={4} style={{textAlign: 'right', paddingRight: '5px'}}>
              {5 - index} Stars:
            </Grid>
            <Grid item xs={8} style={{paddingTop: '3px'}}>
              <div style={
                {
                  width: '75%',
                  height: '12px',
                  background: `linear-gradient(to right, green ${star}%, lightgrey 0%)`
                }}>
              </div>
            </Grid>
          </Grid>
        ))}
        <CharBreakdown metadata={metadata}/>
      </Grid>
    </>
  )
}

export default Ratings;
