import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, Outlet } from 'react-router';
import { myListsPersistence } from '../Lists/manageLists.ts';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export function ListsPage() {
  const [lists,] = useAtom(myListsPersistence);
  const [menuItems, setMenuItems] = useState<{ label: string; path: string; }[]>([]);

  useEffect(() => {
    const menuItems = lists.map((item, index) => {
      return {
        label: item.label,
        path: `/lists/${index}`
      };
    });
    setMenuItems(menuItems);
  }, [lists, setMenuItems]);

  return <>
    <Box sx={{display: 'flex'}}>
      {/* Left Sidebar */}
      <Box sx={{overflow: 'auto'}}>
        <List>
          <ListItem key="/lists" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/lists"
            >
              <ListItemText primary="current >> "/>
            </ListItemButton>
          </ListItem>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    // backgroundColor: "primary.",
                    color: 'secondary.main',
                    fontWeight: 'bold',
                  },
                }}
              >
                <ListItemText primary={item.label}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        {/* This will render the route’s component */}
        <Outlet/>
      </Box>
    </Box>
  </>;
}
