import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  switchToAll,
  switchToHigh,
  switchToDueToday,
  selectNav,
} from './navigationSlice';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Navigation(props) {
  const nav = useSelector(selectNav);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Todo Example App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key="b1" selected={nav === "all"} onClick={() => dispatch(switchToAll())}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button key="b2" selected={nav === "high"} onClick={() => dispatch(switchToHigh())}>
              <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
              <ListItemText primary="High Priority" />
            </ListItem>
            <ListItem button key="b3" selected={nav === "duetoday"} onClick={() => dispatch(switchToDueToday())}>
              <ListItemIcon><AccessTimeIcon /></ListItemIcon>
              <ListItemText primary="Due Today" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
