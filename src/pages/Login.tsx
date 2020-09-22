import { useQuery } from "@apollo/client";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useCallback, useEffect, useState } from "react";
import { IS_AUTHENTICATED } from "../GraphQueiries";
import { UserType } from "../types";
import "./login.css";
interface AlertMessages {
  type: "error" | "success" | "warning";
  message: string;
}
const Login = (props: any) => {
  const [message, setMessage] = useState<AlertMessages | null>(null);
  const { data: authentication } = useQuery(IS_AUTHENTICATED);

  const type = window.localStorage.getItem("type");
  const number = window.localStorage.getItem("number");

  const goToDesiredSite = useCallback(() => {
    window.location.replace(`/mobile/${type}/${number}`);
    localStorage.clear();
  }, [number, type]);
  const allowedToObj = (string: string) => {
    const arr = string.split(/-|=/gi);
    return {
      hall: arr[arr.indexOf("halls") + 1].split(","),
      court: arr[arr.indexOf("courts") + 1].split(","),
    };
  };
  useEffect(() => {
    const searchParams = props.location.search.split(/\?|=|&/);
    const login = searchParams[searchParams.indexOf("login") + 1];
    if (login) {
      login === "failed" &&
        setMessage({ type: "error", message: "فشل تسجيل الدخول" });
      login === "success" &&
        setMessage({
          type: "success",
          message: "نجح تسجيل الدخول جاري معالجة البيانات",
        });
    }
  }, [props.location.search]);
  useEffect(() => {
    if (authentication && authentication.me) {
      const me: UserType = authentication.me;
      if (
        type &&
        number &&
        (me.isAdmin ||
          me.isAllowed ||
          (authentication.me.allowedTo &&
            allowedToObj(authentication.me.allowedTo)[
              type as "hall" | "court"
            ].includes(number)))
      ) {
        goToDesiredSite();
      } else if (me.isAdmin) {
        window.location.replace("/admin");
      } else {
        setMessage({
          type: "warning",
          message: "غير مسموح لك بالدخول على هذه الصفحة، يرجى التواصل معنا",
        });
      }
    }
  }, [authentication, type, number, goToDesiredSite]);

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>تسجيل الدخول</h1>
        <Collapse in={!!message} className="error-alert">
          <Alert severity={message?.type}>{message?.message}</Alert>
        </Collapse>

        <a className="login-button" href="http://localhost:3001/auth/facebook">
          دخول
        </a>
      </div>
    </div>
  );
};

export default Login;
