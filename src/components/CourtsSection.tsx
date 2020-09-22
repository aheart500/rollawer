import React, { useEffect, useState } from "react";
import { TextField, Button, Divider, Collapse } from "@material-ui/core";
import {
  CHANGE_MARKAZ,
  GET_COURTS,
  REMOVE_MARKAZ,
  ADD_COURT,
} from "../GraphQueiries";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { courtType, markazType, StateType } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import Chip from "@material-ui/core/Chip/Chip";
import HallsSection from "./HallsSection";
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
  chip: {
    marginLeft: "0.5rem",
    color: "#fff",
    backgroundColor: "#4890e8",
    "&.MuiChip-root": {
      backgroundColor: "#4890e8",
    },
    "&.MuiChip-clickable:hover": {
      backgroundColor: "#2b60a0",
    },
  },
  specialInput: {
    margin: "0 10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      height: "35px",
      width: "200px",
      fontFamily: '"Cairo", sans-serif',
    },
  },
});

interface CourtsProps {
  markaz: markazType;
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
  refecth: () => void;
  setSelectedMarkaz: React.Dispatch<React.SetStateAction<markazType | null>>;
}
const CourtsSection = ({
  markaz,
  setState,
  refecth,
  state,
  setSelectedMarkaz,
}: CourtsProps) => {
  const classes = useStyles();
  const [markazName, setMarkazName] = useState(markaz.name);
  const [selectedCourt, setSelectedCourt] = useState<courtType | null>(null);
  const [newCourtName, setNewCourtName] = useState("");
  const [error, setError] = useState(false);
  const [newCourtError, setNewCourtError] = useState(false);
  const { data, loading: newCourtLoading, refetch: refecthCourts } = useQuery(
    GET_COURTS,
    {
      variables: { MarkazId: markaz.id },
    }
  );
  const [courts, setCourts] = useState<courtType[] | null>(null);
  useEffect(() => {
    setCourts(data?.courts);
  }, [data]);
  const [addNewCourt] = useMutation(ADD_COURT, {
    variables: { name: newCourtName, MarkazId: markaz.id },
  });
  const [saveNewName, { loading }] = useMutation(CHANGE_MARKAZ, {
    variables: { name: markazName, id: markaz.id },
  });
  const [deleteMarkaz] = useMutation(REMOVE_MARKAZ, {
    variables: { id: markaz.id },
  });
  useEffect(() => {
    setMarkazName(markaz.name);
    setSelectedCourt(null);
  }, [markaz]);

  const changeMarkazName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMarkazName(e.target.value);
  const changeCourtName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewCourtName(e.target.value);
  const handleDelete = () => {
    deleteMarkaz().then(() => {
      setState({
        ...state,
        Markazs: state.Markazs.filter((markazz) => markazz.id !== markaz.id),
      });
      setMarkazName("");
      setSelectedMarkaz(null);
      refecth();
    });
  };
  const handleChangeName = () => {
    setError(false);
    if (markazName === "") {
      setError(true);
      return;
    }
    saveNewName().then((res) => {
      if (res.data) {
        setState({
          ...state,
          Markazs: state.Markazs.map((markazz) => {
            if (markazz.id === markaz.id)
              return { ...markazz, name: markazName };
            return markazz;
          }),
        });
      }

      refecth();
    });
  };

  const handleAddCourt = () => {
    setNewCourtError(false);
    if (newCourtName === "") {
      setNewCourtError(true);
      return;
    }
    addNewCourt().then(() => {
      setNewCourtName("");
      refecthCourts();
    });
  };
  return (
    <>
      <section className="state-body-section">
        <h3>اسم المركز: </h3>
        <TextField
          value={markazName}
          onChange={changeMarkazName}
          variant="outlined"
          error={error}
          className={classes.input}
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
      <section className="state-body-section">
        <h3>المحاكم:</h3>
        {courts?.map((court: courtType) => {
          return (
            <Chip
              key={court.id}
              className={classes.chip}
              label={court.name}
              onClick={() => setSelectedCourt(court)}
            />
          );
        })}
        <TextField
          value={newCourtName}
          onChange={changeCourtName}
          placeholder="إضافة محكمة جديدة"
          variant="outlined"
          className={classes.specialInput}
          error={newCourtError}
        />
        <Button
          variant="outlined"
          className={classes.saveButton}
          color="primary"
          onClick={handleAddCourt}
          disabled={newCourtLoading}
        >
          {newCourtLoading ? "جاري الحفظ" : "حفظ"}
        </Button>
      </section>
      <Divider />
      <Collapse in={selectedCourt ? true : false}>
        {selectedCourt && (
          <HallsSection
            selectedCourt={selectedCourt}
            setSelectedCourt={setSelectedCourt}
            refetch={refecthCourts}
          />
        )}
      </Collapse>
    </>
  );
};

export default CourtsSection;
