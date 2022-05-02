import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Landing from "../../components/Landing/Landing";
import {
  selectInview,
  selectMount,
  selectView,
} from "../../state/page/page.selector";
import cx from "./Welcome.module.css";
import projectData from "../../state/DATA.json";
import ProjectWindow from "../../components/Project_Window/Project_Window";
import { setInview, setMount } from "../../state/page/page.actions";
import { useWheel } from "@use-gesture/react";

const Welcome = ({ inView, view, mount, setMount, setInview }) => {
  const [reset, setReset] = useState(false);
  const [wheelId, setWheelId] = useState(1);
  const [state, setState] = useState({
    build: false,
    show: false,
    cancelAnimation: false,
  });
  const { build, show, cancelAnimation } = state;
  const { background } = projectData[inView];

  const handleSetState = (obj) => {
    setState((state) => ({ ...state, ...obj }));
  };

  const homeWrapperRef = useRef(null);
  const projectWindowRef = useRef(null);
  const domMountRef = useRef(null);

  const getTilt = () => {
    return "tiltN";
  };

  const bind = useWheel(({ wheeling, movement: [, y] }) => {
    if (!reset) {
      if((y < 10 && y > 0) || (y > -10 && y < 0)) return
      setTimeout(() => {
        if (wheeling && y > 0) {
          setWheelId((w) => (w >= 4 ? w : w + 1));
        }
        if (wheeling && y < 0) {
          setWheelId((w) => (w <= 1 ? w : w - 1));
        }
      }, 10);
      setReset(true)
    }

    if (!wheeling) {
      setReset(false)
    }
  });

  useEffect(() => {
    if (!mount) {
      handleSetState({ build: false, show: true });
    } else {
      handleSetState({ build: true });
    }
    setMount(true);
    homeWrapperRef.current.onanimationend = (e) => {
      if (e.animationName.includes("Welcome_build")) {
        handleSetState({ show: true });
      }
    };
    projectWindowRef.current.onanimationend = (e) => {
      if (e.animationName.includes("Welcome_tilt")) {
      }
    };
  }, []);

  useEffect(() => {
    if (domMountRef.current) {
      handleSetState({ cancelAnimation: true });
    }
    domMountRef.current = true;
  }, [view]);


  useEffect(() => {
    if (window.innerWidth <= 1200) return;
    setInview(wheelId ? wheelId : inView);
  }, [wheelId]);

  return (
    <div className={cx.container} {...bind()}>
      <div className={cx.homepage}>
        <div className={cx.homeContentWrapper}>
          <div className={cx.nameContainer}>
            <p className={`${cx.name} ${build && cx.slipIn}`}>Ephraim Sopuru</p>
            <p className={`${cx.role} ${build && cx.slipIn}`}>
              Interaction Designer
            </p>
          </div>

          <div className={`${cx.description} ${build && cx.slipIn}`}>
            <p>The kind of designer you do love to work with</p>
          </div>
        </div>
      </div>

      <div
        ref={homeWrapperRef}
        style={{ background: background }}
        className={` ${cx.homeWrapper} ${build && cx.build} ${
          show && mount ? cx.view : show ? cx.viewStable : ""
        }`}
      >
        <Landing />
      </div>

      <div
        id="project-window"
        ref={projectWindowRef}
        className={`${cx.projectWindow} ${show && cx[getTilt()]} ${
          view ? cx.center : cancelAnimation ? cx.side : ""
        }`}
      >
        <div className={` ${cx.projectWrapper} ${build && cx.slideIn}`}>
          <ProjectWindow />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  inView: selectInview,
  view: selectView,
  mount: selectMount,
});

const mapDispatchToProps = (dispatch) => ({
  setMount: (state) => dispatch(setMount(state)),
  setInview: (projectId) => dispatch(setInview(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
