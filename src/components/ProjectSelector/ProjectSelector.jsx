import { connect } from "react-redux";
import { setInview, setView } from "../../state/page/page.actions";
import { useState } from "react";
import cx from "./ProjectSelector.module.css";
import projectData from "../../state/DATA.json";


const ProjectSelector = ({ setInview, setView, props }) => {
  console.log({props});
  const { mainColor, id } = props;

  const [expand, setExpand] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleMouseLeave = () => {
    setExpand(false);
    setShowText(false);
    setView(false);
  };

  const handleMouseEnter = () => {
    setExpand(true);
    setShowText(true);
    setView(true);
  };

  const handleMouseOver = (id) => {
    setInview(id);
  };

  return (
    <div className={cx.container}>
      <div
        className={cx.drawContainer}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div onMouseOver={() => handleMouseOver(1)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>{projectData[1].projectTitle}</div>
          <div
            style={id === 1 ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._1}`}
          ></div>
        </div>

        <div onMouseOver={() => handleMouseOver(2)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>{projectData[2].projectTitle}</div>
          <div
            style={id === 2 ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._2}`}
          ></div>
        </div>

        <div onMouseOver={() => handleMouseOver(3)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>{projectData[3].projectTitle}</div>
          <div
            style={id === 3 ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._3}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setInview: (projectId) => dispatch(setInview(projectId)),
  setView: (state) => dispatch(setView(state)),
});

export default connect(null, mapDispatchToProps)(ProjectSelector);
