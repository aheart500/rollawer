import { useMutation, useQuery } from "@apollo/client";
import { Button, Switch, TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useEffect, useState } from "react";
import {
  REMOVE_USER,
  GET_USERS,
  ALLOW_USER,
  ADMINIFY_USER,
  ALLOWED_TO,
} from "../GraphQueiries";
import { UserType } from "../types";
const useStyles = makeStyles({
  deleteButton: {
    marginLeft: "5rem",
  },
  saveButton: {
    marginLeft: "1rem",
    height: "50px",
  },
  input: {
    margin: "0 0.5rem",
    "& .MuiOutlinedInput-root": {
      fontFamily: '"Cairo", sans-serif',
    },
  },
  adminName: {
    width: "10%",
  },
  toggleBoxes: {
    width: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
interface allowedToType {
  [name: string]: string;
}
const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<UserType[] | null>(null);
  const { data, refetch } = useQuery(GET_USERS);
  const [allowedTo, setAllowedTo] = useState<allowedToType>({});
  const [deleteUser] = useMutation(REMOVE_USER);
  const [adminfyMe] = useMutation(ADMINIFY_USER);
  const [allowMe] = useMutation(ALLOW_USER);
  const [setMyAllowTo] = useMutation(ALLOWED_TO);
  const handleDelete = (id: number) => {
    deleteUser({ variables: { id } }).then(() => refetch());
  };

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      let allowedToStrings: allowedToType = {};
      data.users.forEach((user: UserType) => {
        allowedToStrings[`${user.id}`] = user.allowedTo || "";
      });
      setAllowedTo(allowedToStrings);
    }
  }, [data]);
  const handleSwitches = (
    id: number,
    field: "admin" | "allowed",
    state: boolean
  ) => {
    field === "admin" &&
      adminfyMe({ variables: { id, state } }).then(() => refetch());
    field === "allowed" &&
      allowMe({ variables: { id, state } }).then(() => refetch());
  };
  const handleTextFieldChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAllowedTo({ ...allowedTo, [name]: value });
  };
  return (
    <div className="state-container">
      <main className="state-body">
        <section className="state-body-section news-body">
          <h3>المستخدمون:</h3>
          {users?.map((user: UserType) => (
            <div className="new-news" key={user.id}>
              <img src={user.pic} alt="user" className="user-pic" />
              <span className={classes.adminName}>{user.name}</span>

              <div className={classes.toggleBoxes}>
                <span>{user.isAdmin ? "أدمن" : "مستخدم"}</span>
                <Switch
                  checked={user.isAdmin}
                  onChange={() =>
                    handleSwitches(user.id, "admin", !user.isAdmin)
                  }
                />
              </div>
              {!user.isAdmin && (
                <div className={classes.toggleBoxes}>
                  <span>{user.isAllowed ? "مشترك" : "غير مشترك"}</span>
                  <Switch
                    checked={user.isAllowed}
                    onChange={() =>
                      handleSwitches(user.id, "allowed", !user.isAllowed)
                    }
                  />
                </div>
              )}
              {!user.isAdmin && !user.isAllowed && (
                <>
                  <div className={classes.toggleBoxes}>
                    <TextField
                      name={`${user.id}`}
                      value={allowedTo[`${user.id}`]}
                      onChange={handleTextFieldChange}
                      className="ltr"
                      variant="outlined"
                      placeholder="الصفحات المسموحة"
                    />
                  </div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      setMyAllowTo({
                        variables: {
                          id: user.id,
                          allowTo: allowedTo[`${user.id}`],
                        },
                      })
                    }
                  >
                    حفظ
                  </Button>
                </>
              )}
              <Button
                className={classes.deleteButton}
                color="secondary"
                variant="contained"
                onClick={() => handleDelete(user.id)}
              >
                حذف المستخدم
              </Button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Users;
