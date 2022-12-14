import { makeStyles } from '@mui/styles'
import React from 'react'
import { MovieCard } from './MovieCard'


export const MovieList = (props) => {
    const classes = useStyle()
    return (
        <div className={classes.movieList} >
            {props.movies && props.movies
            .filter((movie) => {return props.filter?.search ? movie.info.title.toLowerCase().includes(props.filter.search.toLowerCase()) || movie.info.author.toLowerCase().includes(props.filter.search.toLowerCase()) : true}) 
            .filter((movie) => {return props.filter?.onlyAvailable ? movie.available===true : true})
            .sort((a, b) => (a.available < b.available) ? 1 : -1)
            .map((movie) =>
                <MovieCard key={movie.id} movie={movie} action={props.action}/>)}
        </div>
    )
}


const useStyle = makeStyles({
    movieList: {
        display: "flex",
        flexWrap: "wrap",
    }
})