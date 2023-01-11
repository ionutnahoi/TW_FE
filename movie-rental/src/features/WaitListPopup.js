import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MovieCard } from '../components/MovieCard';
import { deleteWaitList } from '../services/waitListService'


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

export const WaitListPopup = (props) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => { setOpen(false); props.action(false, null); };

    const handleClick = async () => {
        const fetchData = async () => {
            await deleteWaitList({ id: props.movie.id })
        }
        await fetchData()
        handleClose()
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

                    <div style={{ display: 'flex' }}>

                        <MovieCard movie={props.movie} />
                        <div style={{padding:'10px'}}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Do you want to remove this movie from the waiting list?
                        </Typography>
                        <br/>
                        <Typography id="modal-modal-description" color="error" variant="subtitle2" component="h">
                            You won't get an email when the movie will be available!
                        </Typography>
                            <Box sx={{ minWidth: 120, padding: "20px" }}>
                                <Button variant="contained" color="error" onClick={handleClick}>Delete</Button>
                            </Box>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
