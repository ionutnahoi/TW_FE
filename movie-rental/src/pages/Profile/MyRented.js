/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MovieList } from '../../components/MovieList'
import { getMyRented } from '../../services/userService'
import { useSelector } from "react-redux"
import { ExtendRentPopup } from '../../features/ExtendRentPopup'


export const MyRented = () => {
  const [movies, setMovies] = useState(null);
  const user = useSelector((state) => state.user.value)

  const [openExtendRentPopup, setOpenExtendRentPopup] = useState(false)
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setMovies(await getMyRented({ id: user.id }))
    }

    fetchData()
  }, [openExtendRentPopup])

  const handleAction = (open, movie) => {
    setOpenExtendRentPopup(open)
    setMovie(movie)
  }

  const renderExtendRentPopup = () => {
    return <ExtendRentPopup open={openExtendRentPopup} movie={movie} action={handleAction} />
  }

  return (
    <div>
      <h1>My Rented:</h1>
      {renderExtendRentPopup()}
      <MovieList movies={movies} action={handleAction} ></MovieList>

    </div>

  )

}