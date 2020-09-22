import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useEffect, useState } from "react";
import { REMOVE_HALL, UPDATE_HALL } from "../GraphQueiries";
import { hallType } from "../types";
import { baseLink } from "../constants";
interface HallProps {
  hall: hallType;
  setSelectedHall: React.Dispatch<React.SetStateAction<hallType | null>>;
  refetch: () => void;
  removeHall: (id: number) => void;
  updateCourt: (newHall: hallType) => void;
}
const useStyles = makeStyles({
  deleteButton: {
    marginRight: "5rem",
    marginLeft: "auto",
  },
  saveButton: {
    width: "90%",
    margin: "0 5%",
  },
  input: {
    width: "50%",
    "& .MuiOutlinedInput-root": {
      fontFamily: '"Cairo", sans-serif',
    },
  },
});
const weekAr = [
  "الجمعة",
  "السبت",
  "الأحد",
  "الأثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
];
const HallSection = ({
  hall,
  setSelectedHall,
  refetch,
  removeHall,
  updateCourt,
}: HallProps) => {
  const classes = useStyles();
  const [officialName, setOfficialName] = useState(hall.official || "");
  const [days, setDays] = useState({
    friday: hall.friday || "",
    saturday: hall.saturday || "",
    sunday: hall.sunday || "",
    monday: hall.monday || "",
    tuesday: hall.tuesday || "",
    wednesday: hall.wednesday || "",
    thursday: hall.tuesday || "",
  });
  const [deleteHall] = useMutation(REMOVE_HALL, {
    variables: { id: hall.id },
  });
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays({ ...days, [e.target.name]: e.target.value });
  };
  const handleOfficalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfficialName(e.target.value);
  };
  const [updateHall, { loading }] = useMutation(UPDATE_HALL, {
    variables: {
      id: hall.id,
      days,
      official: officialName || "",
    },
  });
  const handleSave = () => {
    updateHall().then(({ data }) => {
      if (data) updateCourt(data.updateHall);
      refetch();
    });
  };
  const handleHallDelete = () => {
    deleteHall().then(() => {
      refetch();
      removeHall(hall.id);
      setSelectedHall(null);
    });
  };
  useEffect(() => {
    setOfficialName(hall.official || "");
    setDays({
      friday: hall.friday || "",
      saturday: hall.saturday || "",
      sunday: hall.sunday || "",
      monday: hall.monday || "",
      tuesday: hall.tuesday || "",
      wednesday: hall.wednesday || "",
      thursday: hall.tuesday || "",
    });
  }, [hall]);
  return (
    <>
      <section className="state-body-section">
        <h3>رقم القاعة:</h3>
        <h4>{hall.number}</h4>
        <a
          className="admin-links"
          href={baseLink + "/hall/" + hall.id}
          rel="noopener noreferrer"
          target="_blank"
        >
          الرابط
        </a>
        <Button
          variant="contained"
          className={classes.deleteButton}
          color="secondary"
          onClick={handleHallDelete}
        >
          حذف
        </Button>
      </section>
      <section className="state-body-section daysContainer">
        <h3>اسم المستشار</h3>
        <TextField
          value={officialName}
          onChange={handleOfficalNameChange}
          className={classes.input}
          variant="outlined"
          placeholder="اسم المستشار"
        />
      </section>
      {Object.entries(days).map((day, index) => {
        return (
          <section key={day[0]} className="state-body-section daysContainer">
            <h3>يوم {weekAr[index]}</h3>
            <TextField
              name={day[0]}
              value={day[1]}
              variant="outlined"
              className={classes.input}
              placeholder="التخصص"
              onChange={handleDayChange}
            />
          </section>
        );
      })}
      <Button
        onClick={handleSave}
        className={classes.saveButton}
        variant="contained"
        color="secondary"
        disabled={loading}
      >
        {loading ? "جاري الحفظ" : "حفظ"}
      </Button>
    </>
  );
};

export default HallSection;
