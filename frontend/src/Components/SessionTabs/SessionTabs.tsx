import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import Chat, { type ChatMessage } from '../Chat/Chat.tsx';
import CreateOrEditSession from "./CreateOrEditSession";

export interface ChatSession {
  id: string;
  name: string;
  messages: ChatMessage[];
}

const SessionTabs =() => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [value, setValue] = useState(0);
  const [sessionToEdit, setSessionToEdit] = useState<ChatSession | undefined>();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  // const addMessage = (newMessage: ChatMessage, sessionId: string) => {
  //   const sessionIndex = chatSessions.findIndex((session) => session.id === sessionId);
  //   const session = { ...chatSessions[sessionIndex] };
  //   session.messages = [...session.messages, newMessage];
  //   chatSessions.splice(sessionIndex, 1, session);
  //   setChatSessions(chatSessions);
  // }

  const addChatSession = () => {
    setSessionToEdit({
      id: uuidv4(),
      name: `New chat session`,
      messages: [],
    });
  }

  const handleClose = (editedChatSession?: ChatSession) => {
    if (editedChatSession !== undefined) {
        setChatSessions([...chatSessions, editedChatSession]);
    }
    setSessionToEdit(undefined);
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Jira AI session tabs">
                { chatSessions.map((cs, index) => <Tab key={cs.id} label={cs.name} {...allyProps(index)} />) }
                <Tab onClick={addChatSession} label="Add" {...allyProps(chatSessions.length)} />
            </Tabs>
        </Box>
        { chatSessions.map((cs, index) => (
            <TabPanel key={cs.id} value={value} index={index}>
              <Chat />
            </TabPanel>
          ))
        }
        { sessionToEdit && <CreateOrEditSession open={sessionToEdit !== undefined} chatSession={sessionToEdit as ChatSession} handleClose={handleClose} /> }
        </Box>
  )
};

export const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`menu-tab-panel-${index}`}
        aria-labelledby={'menu-tab-${index}'}
        {...other}
        >
        {value === index &&
          <Box sx={{ p: 3 }}>
            {children}  
        </Box>}
      </div>
    );
}

export const allyProps = (index: number) => {
    return {
      id: `menu-tab-${index}`,
      'aria-controls': `menu-tab-panel-${index}`,
    };
}

export default SessionTabs;
