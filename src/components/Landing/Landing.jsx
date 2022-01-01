import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectActiveProject, selectView } from '../../state/page/page.selector';
import ProjectSelector from '../ProjectSelector/ProjectSelector';
import { toSentenceCase } from '../utils';
import projectData from '../../state/DATA.json';
import cx from './Landing.module.css';
import { useHistory } from 'react-router-dom';
import { setCurrentPage } from '../../state/page/page.actions';

const Landing = ({ activeProject, view, setCurrentPage }) => {
  const [prevId, setPrevId] = useState(projectData[activeProject].id)
  const [dir, setDir] = useState('down');
  const { projectTitle, projectDescription, caseStudy, mainColor, textColor } = projectData[activeProject]
  const history = useHistory();

  const handlePageClick = page => {
    setCurrentPage("home")
    history.push(`/${page}`)
  }

  useEffect(()=> {
    let id = projectData[activeProject].id
    if(prevId > id){
      setDir('down')
      setPrevId(id)
    }else {
      setDir('up')
      setPrevId(id)
    }
  },[activeProject])

  useEffect(()=> {
    try {
      document.getElementById('projectInfo')
      .onanimationend = e => {
        setDir('reset')
      }
    } catch (error) {}
  },[])

  return (
    <div className={cx.landing}>
      <nav className={cx.nav}>
        <div onClick={() => handlePageClick('')}>Ephraim Sopuru</div>
        <div onClick={() => handlePageClick('about')}>About</div>
      </nav>

      <div id='projectInfo' className={`${cx.projectInfo} ${dir === 'down' && cx.up} ${ dir === 'up' && cx.down}`}>
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
        <ProjectSelector props={{mainColor, projectTitle}} />
      </div>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  view: selectView,
  activeProject: selectActiveProject
})

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)