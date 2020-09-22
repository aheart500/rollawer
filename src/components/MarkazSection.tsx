import { useMutation } from "@apollo/client";
import { TextField, Button, Chip } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useState } from "react";
import { ADD_MARKAZ } from "../GraphQueiries";
import { markazType, StateType } from "../types";
const useStyles = makeStyles({
  deleteButton: {
    marginRight: "5rem",
    marginLeft: "auto",
  },
  saveButton: {
    marginLeft: "2rem",
  },
  chip: {
    backgroundColor: "#4890e8",
    marginLeft: "0.5rem",
    color: "#fff",
    "&.MuiChip-root": {
      backgroundColor: "#4890e8",
      color: "#fff",
    },
    "&.MuiChip-clickable:hover": {
      backgroundColor: "#2b60a0",
    },
  },
  input: {
    margin: "0 10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      height: "35px",
      width: "200px",
      fontFamily: '"Cairo", sans-serif',
    },
  },
});
interface MarkazProps {
  marakeez: markazType[];
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  refecth: () => void;
  setSelectedMarkaz: React.Dispatch<React.SetStateAction<markazType | null>>;
}
const MarkazSection = ({
  marakeez,
  setSelectedMarkaz,
  refecth,
  setState,
  state,
}: MarkazProps) => {
  const [newMarkazName, setNewMarkazName] = useState("");
  const [error, setError] = useState(false);
  const [saveNewMarkaz, { loading }] = useMutation(ADD_MARKAZ, {
    variables: { name: newMarkazName, StateId: state.id },
  });
  const classes = useStyles();
  const changeMarkazName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewMarkazName(e.target.value);
  const handleAddMarkaz = () => {
    if (newMarkazName === "") {
      setError(true);
      return;
    }
    saveNewMarkaz().then((res) => {
      if (res.data) {
        setState({ ...state, Markazs: [...state.Markazs, res.data.addMarkaz] });
        setNewMarkazName("");
        refecth();
      }
    });
    setError(false);
  };
  return (
    <section className="state-body-section">
      <h3>المراكز:</h3>
      {marakeez.map((markaz) => {
        return (
          <Chip
            key={markaz.id}
            className={classes.chip}
            label={markaz.name}
            onClick={() => setSelectedMarkaz(markaz)}
          />
        );
      })}
      <TextField
        value={newMarkazName}
        onChange={changeMarkazName}
        placeholder="إضافة مركز جديد"
        variant="outlined"
        className={classes.input}
        error={error}
      />
      <Button
        variant="outlined"
        className={classes.saveButton}
        color="primary"
        onClick={handleAddMarkaz}
        disabled={loading}
      >
        {loading ? "جاري الحفظ" : "حفظ"}
      </Button>
    </section>
  );
};

export default MarkazSection;
