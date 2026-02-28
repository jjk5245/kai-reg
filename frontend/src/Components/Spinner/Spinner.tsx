import React from 'react';
import { Box, CircularProgress, Dialog, DialogContent } from '@mui/material';

interface SpinnerProps {
    open: boolean;
}

const Spinner = ({ open }: SpinnerProps) => {
    return (
        <Dialog open={open}>
            <DialogContent>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100px"
                    minWidth="100px">
                        <CircularProgress color='primary' />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default Spinner;
