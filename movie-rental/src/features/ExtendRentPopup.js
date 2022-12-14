import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { MovieCard } from '../components/MovieCard';
import { extendRent } from '../services/rentsService'


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

export const ExtendRentPopup = (props) => {
    const [open, setOpen] = useState(false);
    const [weeks, setWeeks] = useState("");

    const handleClose = () => { setOpen(false); props.action(false, null); setWeeks("") };

    const handleClick = async () => {
        const fetchData = async () => {
            await extendRent({ id: props.movie.id, period: weeks })
        }
        if (weeks !== "") {
            await fetchData()
            handleClose()
        }
        else {
            alert("Select period")
        }
    };

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
                        Extend Rent
                    </Typography>
                    <div style={{ display: 'flex' }}>

                        <MovieCard movie={props.movie} />
                        <div>
                            <Box sx={{ minWidth: 120, padding: "20px" }}>
                                <FormControl fullWidth>
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
                                    </Select>
                                    <br />
                                    <Button variant="outlined" onClick={handleClick}>Extend Rent</Button>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
