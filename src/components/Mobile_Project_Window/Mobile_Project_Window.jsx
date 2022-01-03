import {  useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setActiveProject } from '../../state/page/page.actions';
import { selectActiveProject, selectInview } from '../../state/page/page.selector';
import cx from './Mobile_Project_Window.module.css';


const MobileProjectWindow = ({ activeProject, inview }) => {

  const history = useHistory();

  const handleProjectClick = (id) => {
    history.push(`/project/${id}`)
  }

  useEffect(() => {
    document.getElementById(`project-mobile${inview}`).scrollIntoView()
  }, [inview])

  useEffect(() => {
    document.getElementById(`project-mobile${activeProject}`).scrollIntoView()
  }, [])

  return (
    <div className={cx.container}>
      {
        (Array(4).fill(null)).map((_, idx) => (

          <div
            id={`project-mobile${idx + 1}`}
            key={idx}
            className={`${cx.project} `}
            onClick={() => handleProjectClick(idx + 1)}
          >
            <h1>projects-{idx + 1}</h1>
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  activeProject: selectActiveProject,
  inview: selectInview
})

const mapDispatchToProps = dispatch => ({
  setActiveProject: projectId => dispatch(setActiveProject(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjectWindow);