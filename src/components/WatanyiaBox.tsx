import React from "react";

const WatanyiaBox = () => {
  return (
    <div className="wataniya-box">
      <img
        src={require("../assets/watanyia.png")}
        height={64}
        width={64}
        alt="watanyia"
      />
      <p>تنفيذ: الشركة الوطنية لانظمة المراقبه والامان والاطفاء والبرمجيات</p>
    </div>
  );
};

export default WatanyiaBox;
