import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Landing from '../../components/Landing/Landing';
import { setActiveProject, setMount, setView, setWelcomeScreen } from '../../state/page/page.actions';
import { selectActiveProject, selectMount, selectView, selectWelcomeScreen } from '../../state/page/page.selector';
import cx from './Welcome.module.css';
import projectData from '../../state/DATA.json';
import ProjectWindow from '../../components/Project_Window/Project_Window';
import { calcView } from '../../components/utils';

const Welcome = ({ activeProject, animate, setWelcomeScreen, setMount, mount, view, setActiveProject }) => {

  const [state, setState] = useState({
    build: false,
    show: false,
    currentProject: 1,
    cancelAnimation: false,
    projects: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    }
  });
  const { build, show, currentProject, projects, cancelAnimation } = state;
  const { background } = projectData[activeProject]

  const handleSetState = (obj) => {
    setState(state => ({ ...state, ...obj }))
  }

  const homeWrapperRef = useRef(null)
  const projectWindowRef = useRef(null);
  const domMountRef = useRef(null);

  useEffect(() => {
    try {
      let projectScrollHandler = projectWindowRef.current
        .addEventListener("scroll", () => {
          handleSetState({
            projects: {
              ...projects,
              "4": parseInt(document
                .getElementById("project4")
                .getBoundingClientRect().top),
              "3": parseInt(document
                .getElementById("project3")
                .getBoundingClientRect().top),
              "2": parseInt(document
                .getElementById("project2")
                .getBoundingClientRect().top),
              "1": parseInt(document
                .getElementById("project1")
                .getBoundingClientRect().top)
            }
          })
        })

      return () => projectScrollHandler
    } catch (error) { }
  }, [])

  useEffect(() => {
    let projectId = calcView(projects, -100)
    if (currentProject !== projectId) handleSetState({ currentProject: projectId })
  }, [projects])

  useEffect(() => {
    if (currentProject) {
      setActiveProject(String(currentProject))
    } else {
      setActiveProject("1")
    }
  }, [currentProject])

  useEffect(() => {
    handleSetState({ build: true })
    if (!animate) {
      handleSetState({ build: false, show: true })
      setMount()
    }
    try {
      homeWrapperRef.current
        .onanimationend = e => {
          if (e.animationName === "Welcome_build__350H9") {
            handleSetState({ show: true })
          } else if (e.animationName === "Welcome_view__10PGv") {
            setWelcomeScreen(false)
          }
        }
    } catch (error) { }
  }, [])

  useEffect(() => {
    if (domMountRef.current) {
      handleSetState({ cancelAnimation: true })
    }
    domMountRef.current = true
  }, [view])


  return (
    <div className={cx.container}>
      {
        animate && (
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
        )
      }

      <div ref={homeWrapperRef}
        style={{ background: background }}
        className={` ${cx.homeWrapper} ${build && cx.build} ${show && cx.view} ${!animate && cx.viewStable}`}
      >
        <Landing />
      </div>

      <div
        ref={projectWindowRef}
        className={`${cx.projectWindow} ${show && cx.tilt} ${!animate && mount && cx.tiltN} ${view ? cx.center : cancelAnimation ? cx.side : ''}`}>
        <div className={` ${cx.projectWrapper} ${build && cx.slideIn}`} >
          <ProjectWindow />
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  activeProject: selectActiveProject,
  animate: selectWelcomeScreen,
  mount: selectMount,
  view: selectView
})

const mapDispatchToProps = dispatch => ({
  setActiveProject: projectId => dispatch(setActiveProject(projectId)),
  setView: state => dispatch(setView(state)),
  setWelcomeScreen: state => dispatch(setWelcomeScreen(state)),
  setMount: () => dispatch(setMount())
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)