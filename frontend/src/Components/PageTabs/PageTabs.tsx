import React from 'react';
import { Box, Tab, Tabs } from "@mui/material";
import { allyProps, TabPanel } from '../SessionTabs/SessionTabs';

const PageTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="JIRA AI Tabs">
                    <Tab label="AI Chat" {...allyProps(0)} />
                    </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                AI Chat
            </TabPanel>
        </Box>
    )
}

export default PageTabs;
