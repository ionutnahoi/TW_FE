/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MovieList } from '../../components/MovieList'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles'
import { getAllMovieInfo } from '../../services/movieInfoService'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RentWaitPopup } from '../../features/RentWaitPopup';

export const Home = () => {
  const [movies, setMovies] = useState(null);
  const [filter, setFilter] = useState({ search: "", onlyAvailable: null });
  const classes = useStyle()

  const [openRentWaitPopup, setOpenRentWaitPopup] = useState(false)
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setMovies(await getAllMovieInfo())
    }

    fetchData()

  }, [openRentWaitPopup])

  const handleAction = (open, movie) => {
    setOpenRentWaitPopup(open)
    setMovie(movie)
  }

  const renderExtendRentPopup = () => {
    return <RentWaitPopup open={openRentWaitPopup} movie={movie} action={handleAction} />
  }

  return (
    <div>
      <div className={classes.searchField}>
        <TextField
          id="searchField"
          label="Search"
          type="text"
          onChange={e => setFilter({ ...filter, search: e.target.value })}
        />
        <FormControlLabel sx={{ marginLeft: "10px" }} control={<Checkbox size="large" onChange={e => { setFilter({ ...filter, onlyAvailable: e.target.checked }) }} />} label="Show only Available" />
      </div>
      <MovieList movies={movies} action={handleAction} filter={filter}></MovieList>
      {renderExtendRentPopup()}
    </div>
  )
}

const useStyle = makeStyles({
  searchField: {
    "& .MuiTextField-root": {
      margin: "20px 0 10px 5px",
      width: "300px",
    },
    display: "flex"
  }
})

