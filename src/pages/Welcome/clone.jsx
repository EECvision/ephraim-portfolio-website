import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Landing from '../Landing/Landing';
import { setActiveProject, setCurrentPage, setInview, setView } from '../../state/page/page.actions';
import { selectActiveProject, selectCurrentPage, selectInview, selectView } from '../../state/page/page.selector';
import cx from './Welcome.module.css';
import { calcView, getActiveProject } from './Welcome.script';
import projectData from '../../state/DATA.json';

const LINK = {
  "1": "project-1",
  "2": "project-2",
  "3": "project-3",
  "4": "project-4"
}

const Welcome = ({ currentPage, setCurrentPage, setActiveProject, activeProject, inview, setInview, view}) => {
  
  const [state, setState] = useState({
    build: false,
    show: false,
    currentProject: 1,
    projects: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    }
  });
  const { build, show, projects, currentProject } = state;
  const { background } = projectData[activeProject]

  const domMountRef = useRef(false);

  const handleSetState = (obj) => {
    setState(state => ({ ...state, ...obj }))
  }

  const homeWrapperRef = useRef(null)
  const projectWindowRef = useRef(null)

  const handleProjectClick = (id) => {
    setCurrentPage(LINK[id])
  }

  useEffect(() => {
    handleSetState({ build: true })
    try {
      homeWrapperRef.current
        .onanimationend = e => {
          if (e.animationName === "Welcome_build__350H9") {
            handleSetState({ show: true })
            // handleSetState({ build: false })
            // handleSetState({ inview: 1 })
            setInview(1)
          }
        }
    } catch (error) {
      console.log('componentDidMount');
    }
  }, [])

  useEffect(() => {
    try {
      document.getElementById(`project${inview}`).scrollIntoView()
    } catch (error) { }
  }, [inview])

  useEffect(() => {
    if (domMountRef.current === true) {
      window.history.pushState(null, "next page", currentPage)
    }
    domMountRef.current = true
  }, [currentPage])

  useEffect(() => {
    try {
      projectWindowRef.current
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
    } catch (error) { }
  }, [])

  useEffect(() => {
    let projectId = calcView(projects)
    if (currentProject !== projectId) handleSetState({ currentProject: projectId })
  }, [projects])

  useEffect(() => {
    if (currentProject) {
      setActiveProject(String(currentProject))
    } else {
      setActiveProject("1")
    }

  }, [currentProject])

  return (
    <div className={cx.container}>
      {
        getActiveProject(currentPage)
      }
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
        style={{background: background}}
        className={` ${cx.homeWrapper} ${build && cx.build} ${show && cx.view}`}
      >
        <Landing activeProject={projectData[activeProject]} />
      </div>

      <div
        ref={projectWindowRef}
        className={`${cx.projectWindow} ${show && cx.tilt} ${view && cx.center}`}>
        <div className={` ${cx.projectWrapper} ${build && cx.slideIn}`} >
          {
            (Array(4).fill(null)).map((_, idx) => (

              <div
                id={`project${idx + 1}`}
                key={idx}
                className={`${cx.project} `}
                onClick={() => handleSetState(handleProjectClick(idx + 1))}
              >
                <h1>projects-{idx + 1}</h1>
                {String(build)}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentPage: selectCurrentPage,
  activeProject: selectActiveProject,
  inview: selectInview,
  view: selectView
})

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  setActiveProject: projectId => dispatch(setActiveProject(projectId)),
  setInview: projectId => dispatch(setInview(projectId)),
  setView: state => dispatch(setView(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)