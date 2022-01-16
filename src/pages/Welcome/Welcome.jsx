import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Landing from '../../components/Landing/Landing';
import { selectInview, selectMount, selectView } from '../../state/page/page.selector';
import cx from './Welcome.module.css';
import projectData from '../../state/DATA.json';
import ProjectWindow from '../../components/Project_Window/Project_Window';
import { setInview, setMount } from '../../state/page/page.actions';

const Welcome = ({ inView, view, mount, setMount, setInview }) => {

  const [counter, setCounter] = useState(0);
  const [wheelId, setWheelId] = useState(1);
  const [state, setState] = useState({
    build: false,
    show: false,
    cancelAnimation: false,
  });
  const { build, show, cancelAnimation } = state;
  const { background } = projectData[inView]

  const handleSetState = (obj) => {
    setState(state => ({ ...state, ...obj }))
  }

  const homeWrapperRef = useRef(null)
  const projectWindowRef = useRef(null);
  const domMountRef = useRef(null);

  const getTilt = () => {
    return 'tiltN';
  }

  function wheelEvent(e) {
    console.log(e.wheelDelta);
    if (e.wheelDelta > 0) {
      setCounter(c => c - 1)
    } else {
      setCounter(c => c + 1)
    }
  }

  useEffect(() => {
    document.getElementById("root")
    .addEventListener('wheel', wheelEvent)
    if (!mount) {
      handleSetState({ build: false, show: true })
    } else {
      handleSetState({ build: true })
    }
    setMount(true)
    homeWrapperRef.current
      .onanimationend = e => {
        if (e.animationName.includes('Welcome_build')) {
          handleSetState({ show: true })
        }
      }
    projectWindowRef.current
      .onanimationend = e => {
        if (e.animationName.includes('Welcome_tilt')) {
        }
      }
  }, [])

  useEffect(() => {
    if (domMountRef.current) {
      handleSetState({ cancelAnimation: true })
    }
    domMountRef.current = true
  }, [view])

  useEffect(() => {
    if (counter > 35) {
      setWheelId(w => w >= 4 ? w : w + 1)
      setCounter(0)
    } else if (counter < -35) {
      setWheelId(w => w <= 1 ? w : w - 1)
      setCounter(0)
    }
    setInview(wheelId ? wheelId : inView)
  }, [counter])

  return (
    <div className={cx.container}>
      <div className={cx.homepage}>
        <div className={cx.homeContentWrapper}>
          <div className={cx.nameContainer}>
            <p className={`${cx.name} ${build && cx.slipIn}`}>Ephraim Sopuru</p>
            <p className={`${cx.role} ${build && cx.slipIn}`}>Interaction Designer</p>
          </div>

          <div className={`${cx.description} ${build && cx.slipIn}`}>
            <p>The kind of designer you do love to work with</p>
          </div>
        </div>
      </div>

      <div ref={homeWrapperRef}
        style={{ background: background }}
        className={` ${cx.homeWrapper} ${build && cx.build} ${show && mount ? cx.view : show ? cx.viewStable : ''}`}
      >
        <Landing />
      </div>

      <div
        ref={projectWindowRef}
        className={`${cx.projectWindow} ${show && cx[getTilt()]} ${view ? cx.center : cancelAnimation ? cx.side : ''}`}>
        <div className={` ${cx.projectWrapper} ${build && cx.slideIn}`} >
          <ProjectWindow />
        </div>
      </div>
      {/* <button style={{ position: 'fixed', zIndex: '100', top: '6em', right: '2em' }} onClick={handleScrollStop}> clear counter</button> */}
    </div>
  )
}

//  show || !mount ? cx.tiltN : cx.test

const mapStateToProps = createStructuredSelector({
  inView: selectInview,
  view: selectView,
  mount: selectMount
})

const mapDispatchToProps = dispatch => ({
  setMount: state => dispatch(setMount(state)),
  setInview: projectId => dispatch(setInview(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)