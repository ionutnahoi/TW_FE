/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { MovieList } from '../../components/MovieList'
import { getWaitListForUser } from '../../services/waitListService'
import { useSelector } from "react-redux"
import { WaitListPopup } from '../../features/WaitListPopup'


export const MyWaitingList = () => {
  const [movies, setMovies] = useState(null);
  const user = useSelector((state) => state.user.value)

  const [openExtendRentPopup, setOpenExtendRentPopup] = useState(false)
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setMovies(await getWaitListForUser({ userId: user.id }))
    }

    fetchData()
  }, [openExtendRentPopup])

  const handleAction = (open, movie) => {
    setOpenExtendRentPopup(open)
    setMovie(movie)
  }

  const renderExtendRentPopup = () => {
    return <WaitListPopup open={openExtendRentPopup} movie={movie} action={handleAction} />
  }

  return (
    <div>
      <h1>My Waiting List:</h1>
      {renderExtendRentPopup()}
      <MovieList movies={movies} action={handleAction} ></MovieList>

    </div>

  )

}