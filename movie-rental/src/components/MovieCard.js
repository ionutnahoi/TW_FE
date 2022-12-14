/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles'
import NotInterestedIcon from '@mui/icons-material/NotInterested';


export const MovieCard = (props) => {
  const classes = useStyle()
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${props.movie.info.title}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(jsonResult => setImageUrl("http://image.tmdb.org/t/p/w500" + jsonResult.results[0].poster_path))
  }, [])

  return (
    <Card sx={{ maxWidth: 200, margin: 1, flex: "1 0 200px", position: "relative" }}>
      <CardActionArea disabled={!props.action} sx={{ height: "100%" }} onClick={() => props.action(true, props.movie)}>
        <CardMedia sx={{ height: 275 }}
          component="img"
          image={imageUrl}
        />
        <CardContent sx={{ height: "100%" }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.movie.info.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.movie.info.genre}
          </Typography>
          {props.movie.returnDate && <Typography variant="subtitle2" color="text.secondary">
            {props.movie.returnDate}<br />
            {props.movie.userName}
          </Typography>}
        </CardContent>
        {props.movie.available === false && <div className={classes.disabled}><NotInterestedIcon sx={{ fontSize: "200px", position: "absolute", color: "#b71105" }} /></div>}
      </CardActionArea>
    </Card>
  );
}

const useStyle = makeStyles({
  disabled: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    zIndex: "1000",
    top: 0,
    left: 0,
    position: "absolute"
  },
})
