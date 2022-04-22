import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectInview, selectView } from '../../state/page/page.selector';
import ProjectSelector from '../ProjectSelector/ProjectSelector';
import { toSentenceCase } from '../utils';
import projectData from '../../state/DATA.json';
import cx from './Landing.module.css';
import { useHistory } from 'react-router-dom';
import { setCurrentPage, setInview } from '../../state/page/page.actions';
import MobileProjectWindow from '../Mobile_Project_Window/Mobile_Project_Window';
import MobileProjectSelector from '../Mobile_Project_Selector/Mobile_Project_Selector';

const Landing = ({ inView, setInview, view, setCurrentPage, m }) => {
  const [state, setState] = useState({
    dir: 'down',
    prevId: projectData[inView].id,
    counter: 1,
  });

  const { dir, prevId, counter } = state;
  const projectWindowRef = useRef(null);

  const { projectTitle, projectDescription, caseStudy, mainColor, background, textColor } = projectData[inView]

  const history = useHistory();
  const handleSetState = obj => {
    setState(state => ({ ...state, ...obj }))
  }

  const handlePageClick = page => {
    setCurrentPage("home")
    history.push(`/${page}`)
  }

  const handleRightDir = () => {
    handleSetState({ counter: counter + 1 })
  }

  const handleLeftDir = () => {
    handleSetState({ counter: counter - 1 })
  }

  useEffect(() => {
    if (counter >= 5) return handleSetState({ counter: 4 })
    if (counter <= 0) return handleSetState({ counter: 1 })
    setInview(counter)
  }, [counter])

  useEffect(() => {
    let id = projectData[inView].id
    if (prevId > id) {
      handleSetState({ dir: 'down' })
    } else {
      handleSetState({ dir: 'up' })
    }
    handleSetState({ prevId: id })
  }, [inView])

  useEffect(() => {
    try {
      document.getElementById('projectInfo')
        .onanimationend = () => {
          handleSetState({ dir: 'reset' })
        }
    } catch (error) { }
  }, [])

  return (
    <div id='landing' style={{ background: background }} className={cx.landing}>
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
          Open case study{m ? 'true' : 'false'}
        </div>
        <div className={cx.dirBtn}>
          <i onClick={handleLeftDir} className="fas fa-angle-left"></i>
          <i onClick={handleRightDir} className="fas fa-angle-right"></i>
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
  inView: selectInview,
})

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  setInview: projectId => dispatch(setInview(projectId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)