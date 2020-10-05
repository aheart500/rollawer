import { useMutation, useQuery } from "@apollo/client";
import { Button, TextField } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import { GET_SETTINGS, UPDATE_SETTINGS } from "../GraphQueiries";
import { SettingsAttributes } from "../types";
const SettingsTap = () => {
  const { data } = useQuery<{ settings: SettingsAttributes }>(GET_SETTINGS);
  const [settings, setSettings] = useState<any | null>(null);

  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  useEffect(() => {
    if (data && data.settings) {
      setSettings(data.settings);
    }
  }, [data]);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    } as SettingsAttributes);
  };
  const handleSubmit = () => {
    let mutationState: any = {};
    for (let key in settings) {
      mutationState[key] = settings[key] !== "" ? parseInt(settings[key]) : 0;
    }
    updateSettings({ variables: mutationState }).then(() =>
      alert("تم تحديث الإعدادات")
    );
  };

  return (
    <div className="state-container">
      <main className="state-body">
        <section className="state-body-section news-body">
          <h1>الإعدادات</h1>
          <form
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            onSubmit={(e) => e.preventDefault()}
          >
            {settings &&
              Object.keys(settings)
                .filter((key) => !["id", "__typename"].includes(key))
                .map((key, i) => {
                  const label =
                    key === "court_rollNumberSize"
                      ? "حجم الرول نمبر في المحكمة"
                      : key === "hall_rollNumberSize"
                      ? "حجم الرول نمبر في القاعة"
                      : key === "court_paddinTop"
                      ? "المسافة بين القاعة وبداية الصفحة"
                      : key === "court_titleSize"
                      ? "حجم عنوان القاعة في المحكمة"
                      : key === "hall_titleSize"
                      ? "حجم عنوان القاعة في القاعة"
                      : key === "court_specialitySize"
                      ? "حجم التخصص في المحكمة"
                      : key === "hall_specialitySize"
                      ? "حجم التخصص في القاعة"
                      : key === "hall_officialNameSize"
                      ? "حجم اسم المستشار في القاعة"
                      : key === "court_officailNameSize"
                      ? "حجم اسم المستشار في المحكمة"
                      : "عدد ثواني مرور شريط الأخبار";
                  return (
                    <TextField
                      style={{ margin: "1rem 2rem", flexBasis: "40%" }}
                      label={label}
                      name={key}
                      key={i}
                      type="number"
                      variant="filled"
                      value={settings[key as keyof SettingsAttributes]}
                      onChange={handleTextChange}
                    />
                  );
                })}
          </form>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {" "}
            حفظ الإعدادات
          </Button>
        </section>
      </main>
    </div>
  );
};

export default SettingsTap;
