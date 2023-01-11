import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useSelector } from "react-redux"
import { MovieCard } from '../components/MovieCard';
import { addRent, getDateWhenMovieWillBeAvailable } from '../services/rentsService'
import { addWaitList } from '../services/waitListService'
import { useNavigate } from "react-router-dom";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const RentWaitPopup = (props) => {
    const user = useSelector((state) => state.user.value)
    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const [weeks, setWeeks] = useState("");

    const handleClose = () => { setOpen(false); props.action(false, null); setWeeks("") };

    const handleRentClick = async () => {
        const fetchData = async () => {
            await addRent({ userId: user.id, movieId: props.movie.id, period: weeks })

        }
        if (weeks !== "") {
            await fetchData()
            handleClose()
            navigate('/myRented');
        }
        else {
            alert("Select period")
        }
    };
    const handleWaitClick = async() => {
        const fetchData = async () => {
            await addWaitList({ userId: user.id, movieId: props.movie.id })
        }
        await fetchData()
        handleClose()
        navigate('/myWaitingList');
    };

    const [date, setDate] = useState("");
    const availableDate = () => {

        const fetchData = async () => {
            setDate(await getDateWhenMovieWillBeAvailable({ movieId: props.movie.id }))
        }
        if (fetchData()) {
            return date
        }
    }


    useEffect(() => {
        setOpen(props.open)
    }, [props.open])


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {props.movie?.available === true ? "Rent Movie" : "Add to waiting list"}
                    </Typography>
                    <div style={{ display: 'flex' }}>
                        <MovieCard movie={{ ...props.movie, available: true }} />
                        <div>
                            <Box sx={{ minWidth: 120, padding: "20px" }}>
                                {props.movie?.available === true && <FormControl fullWidth>
                                    <InputLabel id="weeks-select-label">Weeks</InputLabel>
                                    <Select
                                        labelId="weeks-select-label"
                                        id="weeks-select"
                                        value={weeks}
                                        label="Weeks"
                                        onChange={(e) => { setWeeks(e.target.value) }}
                                    >
                                        <MenuItem value={1}>One</MenuItem>
                                        <MenuItem value={2}>Two</MenuItem>
                                        <MenuItem value={3}>Three</MenuItem>
                                        <MenuItem value={4}>Four</MenuItem>

                                    </Select>
                                    <br />
                                    <Button variant="outlined" onClick={handleRentClick}>Rent</Button>
                                </FormControl>}
                                {props.movie?.available === false &&
                                    <>
                                        <Typography id="wait-time" variant="h6" component="h6">
                                            {`Movie will be available from: ${availableDate()}`}
                                        </Typography>
                                        <br />
                                        <Button variant="outlined" onClick={handleWaitClick}>Wait movie</Button>
                                    </>
                                }
                            </Box>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
