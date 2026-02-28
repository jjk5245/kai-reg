import AppBar from '@mui/material/AppBar';
import { IconButton, Typography, Toolbar, Box, MenuItem  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function JiraAIAppBar() {
  const navigate = useNavigate();
  const goToToolPage = () => {
    navigate('/tools');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2}}
                />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Jira AI
            </Typography>

            <MenuItem onClick={goToToolPage}>
              <Typography sx={{ textAlign: 'center' }}>Tools</Typography>
            </MenuItem>
          </Toolbar>
        </AppBar>
    </Box>
  )
}
