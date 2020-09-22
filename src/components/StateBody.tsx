import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { markazType } from "../types";
import "./state-body.css";
import { useMutation } from "@apollo/client";
import { REMOVE_STATE, CHANGE_STATE } from "../GraphQueiries";
import { StateType } from "../types";
import MarkazSection from "./MarkazSection";
import Divider from "@material-ui/core/Divider";
import CourtsSection from "./CourtsSection";
import Collapse from "@material-ui/core/Collapse/Collapse";
const useStyles = makeStyles({
  deleteButton: {
    marginRight: "5rem",
    marginLeft: "auto",
  },
  saveButton: {
    marginLeft: "2rem",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      height: "50px",
      fontFamily: '"Cairo", sans-serif',
    },
  },
});
interface props {
  state: StateType;
  refecth: () => void;
  setSelectedState: React.Dispatch<React.SetStateAction<StateType | null>>;
}

const StateBody = ({
  state: PassedState,
  setSelectedState,
  refecth,
}: props) => {
  const [selectedMarkaz, setSelectedMarkaz] = useState<markazType | null>(null);
  const [state, setState] = useState<StateType>(PassedState);
  const [error, setError] = useState(false);
  const [deleteState] = useMutation(REMOVE_STATE, {
    variables: { id: state.id },
  });
  const [updateName, { loading }] = useMutation(CHANGE_STATE, {
    variables: { id: state.id, name: state.name },
  });
  const changeStateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: e.target.value });
  };
  const handleDelete = () => {
    deleteState().then(() => {
      setSelectedState(null);
      refecth();
    });
  };
  const handleChangeName = () => {
    setError(false);
    if (state.name === "") {
      setError(true);
      return;
    }
    updateName().then((res) => {
      if (res.data) {
        setSelectedState(res.data.changeName);
        refecth();
      }
    });
  };
  useEffect(() => {
    setState(PassedState);
    setSelectedMarkaz(null);
  }, [PassedState]);
  const classes = useStyles();
  return (
    <div className="state-container">
      <main className="state-body">
        <section className="state-body-section">
          <h3>اسم المحافظة: </h3>
          <TextField
            value={state.name}
            onChange={changeStateName}
            variant="outlined"
            className={classes.input}
            error={error}
          />
          <Button
            variant="contained"
            className={classes.saveButton}
            color="primary"
            onClick={handleChangeName}
            disabled={loading}
          >
            {loading ? "جاري الحفظ" : "حفظ"}
          </Button>
          <Button
            variant="contained"
            className={classes.deleteButton}
            color="secondary"
            onClick={handleDelete}
          >
            حذف
          </Button>
        </section>
        <Divider />
        <MarkazSection
          setSelectedMarkaz={setSelectedMarkaz}
          refecth={refecth}
          state={state}
          setState={setState}
          marakeez={state.Markazs || []}
        />
        <Divider />
        <Collapse in={selectedMarkaz ? true : false}>
          {selectedMarkaz && (
            <CourtsSection
              setSelectedMarkaz={setSelectedMarkaz}
              markaz={selectedMarkaz}
              state={state}
              setState={setState}
              refecth={refecth}
            />
          )}
        </Collapse>
      </main>
    </div>
  );
};

export default StateBody;
