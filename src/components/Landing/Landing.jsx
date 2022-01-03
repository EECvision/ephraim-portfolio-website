import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectActiveProject, selectView } from '../../state/page/page.selector';
import ProjectSelector from '../ProjectSelector/ProjectSelector';
import { calcView, toSentenceCase } from '../utils';
import projectData from '../../state/DATA.json';
import cx from './Landing.module.css';
import { useHistory } from 'react-router-dom';
import { setActiveProject, setCurrentPage } from '../../state/page/page.actions';
import MobileProjectWindow from '../Mobile_Project_Window/Mobile_Project_Window';
import MobileProjectSelector from '../Mobile_Project_Selector/Mobile_Project_Selector';

const Landing = ({ activeProject, view, setCurrentPage, setActiveProject }) => {
  const [state, setState] = useState({
    dir: 'down',
    prevId: projectData[activeProject].id,
    currentProject: 1,
    projects: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    }
  });
  const { dir, prevId, projects, currentProject } = state;

  const projectWindowRef = useRef(null);

  const { projectTitle, projectDescription, caseStudy, mainColor, background, textColor } = projectData[activeProject]
  const history = useHistory();

  const handleSetState = obj => {
    setState(state => ({ ...state, ...obj }))
  }

  const handlePageClick = page => {
    setCurrentPage("home")
    history.push(`/${page}`)
  }

  useEffect(() => {
    let id = projectData[activeProject].id
    if (prevId > id) {
      handleSetState({ dir: 'down' })
    } else {
      handleSetState({ dir: 'up' })
    }
    handleSetState({ prevId: id })
  }, [activeProject])

  useEffect(() => {
    try {
      document.getElementById('projectInfo')
        .onanimationend = e => {
          handleSetState({ dir: 'reset' })
        }
    } catch (error) { }
  }, [])

  useEffect(() => {
    try {
      let projectScrollHandler = projectWindowRef.current
        .addEventListener("scroll", e => {
          handleSetState({
            projects: {
              ...projects,
              "4": parseInt(document
                .getElementById("project-mobile4")
                .getBoundingClientRect().right),
              "3": parseInt(document
                .getElementById("project-mobile3")
                .getBoundingClientRect().right),
              "2": parseInt(document
                .getElementById("project-mobile2")
                .getBoundingClientRect().right),
              "1": parseInt(document
                .getElementById("project-mobile1")
                .getBoundingClientRect().right)
            }
          })
        })
      return () => projectScrollHandler
    } catch (error) { }
  }, [])

  useEffect(() => {
    let projectId = calcView(projects, 300)
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
    <div style={{background: background}} className={cx.landing}>
      <nav className={cx.nav}>
        <div onClick={() => handlePageClick('')}>Ephraim Sopuru</div>
        <div onClick={() => handlePageClick('about')}>About</div>
      </nav>

      <div className={cx.mobileProjectSelectorWrapper}>
        <MobileProjectSelector props={{ mainColor, projectTitle }} />
        </div>

      <div
        ref={projectWindowRef}
        className={cx.MobileProjectWindowWrapper}
      >
        <MobileProjectWindow />
      </div>

      <div id='projectInfo' className={`${cx.projectInfo} ${dir === 'down' && cx.up} ${dir === 'up' && cx.down}`}>
        <h1 style={{ color: mainColor }} className={cx.projectTitle}>{toSentenceCase(projectTitle)}</h1>
        <p style={{ color: textColor }} className={cx.projectDescription}>
          {projectDescription}
        </p>
        <div onClick={() => handlePageClick(caseStudy)} className={cx.projectLink}>
          Open case study
        </div>
      </div>

      <div style={{ background: mainColor }} className={cx.sideScroll}></div>
      <div className={cx.smallScreen}></div>

      <div className={`${cx.overlay} ${view && cx.show}`}></div>

      <div className={cx.projectSelectorWrapper}>
        <ProjectSelector props={{ mainColor, projectTitle }} />
      </div>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  view: selectView,
  activeProject: selectActiveProject
})

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  setActiveProject: projectId => dispatch(setActiveProject(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)