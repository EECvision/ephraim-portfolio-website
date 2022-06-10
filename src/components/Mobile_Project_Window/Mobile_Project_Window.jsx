import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectInview } from "../../state/page/page.selector";
import cx from "./Mobile_Project_Window.module.css";
import prosafeImg from "../../assets/prosafe.png";
import commehubImg from "../../assets/commehub.png";
import genadropImg from "../../assets/genadrop.png";

const mapImageToId = {
  0: genadropImg,
  1: commehubImg,
  2: prosafeImg,
};

const MobileProjectWindow = ({ inview }) => {
  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push(`/project/${id}`);
  };

  useEffect(() => {
    document.getElementById(`project-mobile${inview}`).scrollIntoView();
  }, [inview]);

  return (
    <div className={cx.container}>
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <div
            style={{backgroundImage: `url(${mapImageToId[idx]})`}}
            id={`project-mobile${idx + 1}`}
            key={idx}
            className={`${cx.project} `}
            onClick={() => handleProjectClick(idx + 1)}
          >
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inview: selectInview,
});

export default connect(mapStateToProps)(MobileProjectWindow);
