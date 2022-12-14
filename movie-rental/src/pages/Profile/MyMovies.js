/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MovieList } from '../../components/MovieList'
import { getMyMovies } from '../../services/userService'
import { useSelector } from "react-redux"
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AddMoviePopup } from '../../features/AddMoviePopup'


export const MyMovies = () => {
  const [movies, setMovies] = useState();
  const user = useSelector((state) => state.user.value)
  const classes = useStyle()

  const [openAddMoviePopup, setOpenAddMoviePopup] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setMovies(await getMyMovies({ id: user.id }))
    }

    fetchData()
  }, [openAddMoviePopup])


  const renderAddMoviePopup = () => {
    return <AddMoviePopup open={openAddMoviePopup} action={setOpenAddMoviePopup} />
  }

  return (
    <div>
      <div className={classes.headerLayer} >
        <h1>My Movies:</h1>
        <Button className={classes.addButton} type="submit" variant="outlined" onClick={() => { setOpenAddMoviePopup(true) }}>Add movie</Button>
      </div>
      <MovieList movies={movies}></MovieList>
      {renderAddMoviePopup()}
    </div>
  )
}

const useStyle = makeStyles({
  headerLayer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  addButton: {
    height: "50px",
    marginBlock: "auto"
  }
})