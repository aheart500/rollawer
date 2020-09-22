import { Button, TextField, Chip, Divider, Collapse } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { courtType, hallType } from "../types";
import { CHANGE_COURT, REMOVE_COURT, ADD_HALL } from "../GraphQueiries";
import { useMutation } from "@apollo/client";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Hall from "./HallSection";
import { baseLink } from "../constants";
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
interface hallsProps {
  selectedCourt: courtType;
  setSelectedCourt: React.Dispatch<React.SetStateAction<courtType | null>>;
  refetch: () => void;
}
const HallsSection = ({
  selectedCourt,
  refetch,
  setSelectedCourt,
}: hallsProps) => {
  const [court, setCourt] = useState<courtType>(selectedCourt);
  const [error, setError] = useState(false);
  const [newHallError, setNewHallError] = useState(false);
  const [newHallNumber, setNewHallNumber] = useState("");
  const [saveNewHall, { loading: newHallLoading }] = useMutation(ADD_HALL, {
    variables: { CourtId: court.id, number: Number(newHallNumber) },
  });
  const [hall, setSelectedHall] = useState<hallType | null>(null);
  const [updateCourtName, { loading }] = useMutation(CHANGE_COURT, {
    variables: { name: court.name, id: court.id },
  });
  const [deleteCourt] = useMutation(REMOVE_COURT, {
    variables: { id: court.id },
  });
  const handleChangeCourtName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCourt({ ...court, name: e.target.value });
  const changeHallNumber = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewHallNumber(e.target.value);
  useEffect(() => {
    setCourt(selectedCourt);
    setSelectedHall(null);
  }, [selectedCourt]);
  const handleChangeName = () => {
    setError(false);
    if (court.name === "") {
      setError(true);
      return;
    }
    updateCourtName().then(() => {
      refetch();
    });
  };

  const handleCourtDelete = () => {
    deleteCourt().then((res) => {
      refetch();
      setSelectedCourt(null);
      setSelectedHall(null);
    });
  };
  const handleAddHall = () => {
    setNewHallError(false);
    if (newHallNumber === "" || isNaN(Number(newHallNumber))) {
      setNewHallError(true);
      return;
    }
    saveNewHall().then(({ data }) => {
      if (data)
        setCourt({
          ...court,
          Halls: [...court.Halls, data.addHall],
        });
    });
    refetch();
  };
  const removeHall = (hallId: number) => {
    setCourt({
      ...court,
      Halls: court.Halls.filter((halli) => halli.id !== hallId),
    });
  };
  const updateCourt = (newHall: hallType) => {
    setCourt({
      ...court,
      Halls: court.Halls.map((halli) => {
        if (halli.id === newHall.id) return newHall;
        return halli;
      }),
    });
  };
  const classes = useStyles();
  return (
    <>
      <section className="state-body-section">
        <h3>اسم المحكمة:</h3>
        <TextField
          value={court.name}
          onChange={handleChangeCourtName}
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

        <a
          className="admin-links"
          href={baseLink + "/court/" + court.id}
          rel="noopener noreferrer"
          target="_blank"
        >
          الرابط
        </a>
        <Button
          variant="contained"
          className={classes.deleteButton}
          color="secondary"
          onClick={handleCourtDelete}
        >
          حذف
        </Button>
      </section>
      <Divider />
      <section className="state-body-section">
        <h3>القاعات:</h3>
        {court.Halls.map((hall) => {
          return (
            <Chip
              key={hall.id}
              className={classes.chip}
              label={hall.number}
              onClick={() => setSelectedHall(hall)}
            />
          );
        })}
        <TextField
          value={newHallNumber}
          onChange={changeHallNumber}
          placeholder="إضافة قاعة جديدة"
          variant="outlined"
          className={classes.specialInput}
          error={newHallError}
        />
        <Button
          variant="outlined"
          className={classes.saveButton}
          color="primary"
          onClick={handleAddHall}
          disabled={newHallLoading}
        >
          {newHallLoading ? "جاري الحفظ" : "حفظ"}
        </Button>
      </section>
      <Divider />
      <Collapse in={hall ? true : false} timeout="auto">
        {hall && (
          <Hall
            hall={hall}
            removeHall={removeHall}
            setSelectedHall={setSelectedHall}
            refetch={refetch}
            updateCourt={updateCourt}
          />
        )}
      </Collapse>
    </>
  );
};

export default HallsSection;
