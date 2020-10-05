import React, { useState } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { StateType } from "../types";
import { Collapse, TextField, Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { ADD_STATE } from "../GraphQueiries";
import { taps } from "../pages/Admin";

const useStyles = makeStyles((theme) => ({
  drawer: {
    "& .MuiDrawer-paper": {
      background: "linear-gradient(#ffc3e4, #7f9df3)",
    },
  },
  list: {
    width: "200px",
  },
  listText: {
    "& span": {
      fontFamily: '"Cairo", sans-serif',
      fontSize: "20px",
    },
  },
  listAddState: {
    "& span": {
      fontFamily: '"Cairo", sans-serif',
      fontSize: "17px",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  addButtonWidth: {
    width: "90%",
  },
}));
interface props {
  states: StateType[];
  refecth: () => void;
  handleSelectState: (state: StateType) => void;
  handleSelectTap: (tap: taps) => void;
}
const StatesDrawer = React.memo(
  ({ states, refecth, handleSelectState, handleSelectTap }: props) => {
    const classes = useStyles();
    const [addStateMode, setAddStateMode] = useState(false);
    const [stateName, setStateName] = useState("");
    const [error, setError] = useState(false);
    const toggleAddState = () => setAddStateMode(!addStateMode);
    const [saveState] = useMutation(ADD_STATE, {
      variables: {
        name: stateName,
      },
    });

    const handleSave = () => {
      setError(false);
      if (stateName === "" || stateName === " ") {
        setError(true);
        return;
      }
      saveState().then(() => {
        refecth();
        setAddStateMode(false);
      });
    };
    return (
      <Drawer className={classes.drawer} anchor="left" variant="permanent">
        <List className={classes.list}>
          <ListItem button onClick={() => handleSelectTap("news")}>
            <ListItemText className={classes.listText} primary="الأخبار" />
          </ListItem>
          <ListItem button onClick={() => handleSelectTap("users")}>
            <ListItemText className={classes.listText} primary="المستخدمون" />
          </ListItem>
          <ListItem button onClick={() => handleSelectTap("images")}>
            <ListItemText className={classes.listText} primary="الصور" />
          </ListItem>
          <ListItem button onClick={() => handleSelectTap("settings")}>
            <ListItemText className={classes.listText} primary="الضبط" />
          </ListItem>
          <Divider />
          {states.map((state) => {
            return (
              <ListItem
                button
                key={state.id}
                onClick={() => handleSelectState(state)}
              >
                <ListItemText
                  className={classes.listText}
                  primary={state.name}
                />
              </ListItem>
            );
          })}
          <ListItem button onClick={toggleAddState}>
            <ListItemIcon>
              {" "}
              <AddIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.listAddState}
              primary="إضافة محافظة"
            />
          </ListItem>
          <Collapse in={addStateMode} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <TextField
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="اسم المحافظة"
                  error={error}
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.addButtonWidth}
                  onClick={handleSave}
                >
                  حفظ
                </Button>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    );
  }
);

export default StatesDrawer;
