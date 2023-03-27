import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';

function Layout({setActivePage}){
  return (
    <>
    <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Airlines Info
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem disablePadding onClick={()=>setActivePage("passengers")}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Passengers" />
                </ListItemButton>
              </ListItem>
              <ListItem  disablePadding onClick={()=>setActivePage("airlines")}>
                <ListItemButton>
                  <ListItemIcon>
                    <AirplanemodeActiveIcon /> 
                  </ListItemIcon>
                  <ListItemText primary="Airlines" />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
            </>
  )
}

export default Layout