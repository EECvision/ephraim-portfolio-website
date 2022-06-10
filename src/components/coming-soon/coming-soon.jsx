import { useState } from "react";
import cx from "./coming-soon.module.css";
import emoji from '../../assets/emoji.png';

const ComingSoon = ({ active }) => {
  const [close, setClose] = useState(false);

  return (
    <div
      className={`${cx.container} ${
        active &&
        window.sessionStorage.mounted === undefined &&
        !close &&
        cx.active
      }`}
    >
      <div className={cx.card}>
        <img src={emoji} alt="" />
        <h1>Site under construction</h1>
        <div
          onClick={() => {
            window.sessionStorage.mounted = true;
            setClose(true);
          }}
          className={cx.btn}
        >
          Proceed anyways
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
