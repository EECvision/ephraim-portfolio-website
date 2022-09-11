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
import ComingSoon from "../../components/coming-soon/coming-soon";

const Welcome = ({ inView, view, mount, setMount, setInview }) => {
  const homeWrapperRef = useRef(null);
  const projectWindowRef = useRef(null);
  const domMountRef = useRef(null);
  const run = useRef(null);
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

  const getTilt = () => {
    return "tiltN";
  };

  const handleSlideUp = () => {
    setWheelId((sc) => (sc >= 3 ? sc : (sc += 1)));
  };

  const handleSlideDown = () => {
    setWheelId((sc) => (sc <= 1 ? sc : (sc -= 1)));
  };

  const bind = useWheel(({ wheeling, movement: [, y] }) => {
    console.log(run.current);

    if (y > 0 && run.current) {
      handleSlideUp();
      run.current = false;
    } else if (y < 0 && run.current) {
      handleSlideDown();
      run.current = false;
    }

    if (!wheeling) {
      run.current = true;
    }
  });

  useEffect(() => {
    run.current = true;
  }, []);

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
      <ComingSoon active={show && mount}/>
      <div className={cx.homepage}>
        <div className={cx.homeContentWrapper}>
          <div className={cx.nameContainer}>
            <p className={`${cx.name} ${build && cx.slipIn}`}>Buchi Ephraim</p>
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
