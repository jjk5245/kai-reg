import React, { useState } from 'react';
import { TextField, Box, Typography, ListItem, List, Paper, IconButton, Divider, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
    id: string,
    text: string,
    sender: string,
}

const ChatPage = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [spinnerOpen, setSpinnerOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSend = async (message: string) => {
        setMessages([...messages, { id: uuidv4(), text: message, sender: "me" }]);
        setSpinnerOpen(true);

        // Simulate API call
        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { id: uuidv4(), text: "This is a response from the bot.", sender: "bot" }]);
            setSpinnerOpen(false);
        }, 2000);
    };

    return (
        <Stack direction="row" spacing={2} sx={{ height: '90vh', width: '100%' }}>
            <Box sx={{ height: '500px', width: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5', padding: '.25rem' }}>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">AI Chat</Typography>
                </Paper>

                <Box
                    sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: 1 }}
                >
                  <List>
                    {messages.map(msg => (
                      <ListItem
                        key={msg.id}
                        sx={{ flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: msg.sender === 'me' ? 'row-reverse' : 'row', alignItems: 'center' }}>
                                <Typography variant="body2">{msg.text}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                    </List>
                </Box>

            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
            onSubmit={(e) => { e.preventDefault(); }}>

                <TextField
                    variant="standard"
                    placeholder='Type a message...'
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    sx={{ ml: 2, flex: 1 }}
                    />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} onClick={() => { handleSend(inputValue); setInputValue(""); }}>
                    <SendIcon />
                </IconButton>
            </Paper>
            </Box>
        </Stack>
    );
};

export default ChatPage;
