import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import type { ChatSession } from './SessionTabs';

interface CreateOrEditSessionProps {
    open: boolean;
    chatSession: ChatSession;
    handleClose: (editedChatSession?: ChatSession) => void;
}

const CreateOrEditSession = ({ open, chatSession, handleClose }: CreateOrEditSessionProps) => {
    const [editContext, setEditContext] = useState<ChatSession>(chatSession);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }  = event.target;
        setEditContext((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        handleClose(editContext);
    };

    return (
        <Dialog open={open} onClose={() => handleClose()} fullWidth maxWidth="sm">
            <DialogTitle>Edit Item</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={editContext.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(undefined)} color="primary" variant='outlined'>
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant='contained'>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateOrEditSession;
