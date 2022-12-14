/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MovieList } from '../../components/MovieList'
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles'
import { getAllMovieInfo } from '../../services/movieInfoService'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export const Home = () => {
  const [movies, setMovies] = useState(null);
  const [filter, setFilter] = useState({ search: "", onlyAvailable: null });
  const classes = useStyle()

  useEffect(() => {
    const fetchData = async () => {
      setMovies(await getAllMovieInfo())
    }

    fetchData()

  }, [])


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
      <MovieList movies={movies}  filter={filter}></MovieList>
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

