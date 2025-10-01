import { NavLink } from 'react-router';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

export function Nav() {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{ top: 0 }}
    >
      <Toolbar
        variant="dense"
      >
        {/* App title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Onregelmatige werkworden
        </Typography>

        {/* Menu buttons */}
        <Button
          component={NavLink}
          color="inherit"
          to="/"
        >Home</Button>
        <Button
          component={NavLink}
          color="inherit"
          to="/learn"
        >Learn</Button>
        <Button
          component={NavLink}
          color="inherit"
          to="/lists"
        >Lists</Button>
        <Button
          component={NavLink}
          color="inherit"
          to="/profile"
        >Profile</Button>
      </Toolbar>
    </AppBar>
  );
}
