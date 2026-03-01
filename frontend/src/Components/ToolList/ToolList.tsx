import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Card, Divider, Switch } from '@mui/material';

const activeColor ="#496a81";
const inactiveColor ="#773344";

export default function ToolList() {
    const exampleTools = [
        {
            name: "tool 1",
            description: "tool 1 desc",
            location: "https://example-tool.com",
            enabled: true,
            accesible: true,
        },
        {
            name: "tool 2",
            description: "tool 2 desc",
            location: "https://example-tool.com",
            enabled: true,
            accesible: false,
        },
    ];
  return (
    <Card sx={{ margin: 'auto', minWidth: '400px', marginTop: '.5rem', width: '80%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <List subheader={<ListSubheader>Tools</ListSubheader>} >
            <Divider />

        {/* <ListItem>
            <ListItemIcon>
            <WifiIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
        </ListItem>
        <ListItem>
            <ListItemIcon>
            <BluetoothIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
        </ListItem> */}
        {exampleTools.map(et => 
            <ListItem>
            <svg height="32" width="32">
                <circle cx="15" cy="15" r="10" fill={et.accesible ? activeColor : inactiveColor} />
            </svg>
                <ListSubheader>{et.name}</ListSubheader>
                <ListItemText>{et.description}</ListItemText>
                <Switch />
            </ListItem>
        )}

        </List>
    </Card>
  );
}
