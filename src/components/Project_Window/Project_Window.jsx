import { useRef } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectInview, selectView } from "../../state/page/page.selector";
import { mapImageToId } from "../utils";
import cx from "./Project_Window.module.css";

const ProjectWindow = ({ inview, view }) => {
  const domMountRef = useRef(false);

  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push(`/project/${id}`);
  };

  useEffect(() => {
    if (domMountRef.current) {
      let x = document
        .getElementById(`project${inview}`)
        .getBoundingClientRect().height;
      document.getElementById(
        "project-window2"
      ).style.transform = `translateY(${-((x - 100) * (inview - 1))}px)`;
    }
    domMountRef.current = true;
  }, [inview]);

  return (
    <div id="project-window2" className={cx.container}>
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <div
            style={{ backgroundImage: `url(${mapImageToId[idx]})` }}
            id={`project${idx + 1}`}
            key={idx}
            className={`${cx.project} ${inview === idx + 1 && cx.active} ${
              view && cx.viewMode
            } `}
            onClick={() => handleProjectClick(idx + 1)}
          ></div>
        ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inview: selectInview,
  view: selectView,
});

export default connect(mapStateToProps)(ProjectWindow);
