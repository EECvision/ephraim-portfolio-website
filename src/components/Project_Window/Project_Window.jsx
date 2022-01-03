import { useRef } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setActiveProject } from '../../state/page/page.actions';
import { selectActiveProject, selectInview, selectView } from '../../state/page/page.selector';
import cx from './Project_Window.module.css';


const ProjectWindow = ({ activeProject, inview, view }) => {

  const domMountRef = useRef(null);
  const history = useHistory();

  const handleProjectClick = (id) => {
    history.push(`/project/${id}`)
  }

  useEffect(() => {
    if (domMountRef.current) {
      document.getElementById(`project${inview}`).scrollIntoView()
    }
    domMountRef.current = true
  }, [inview])

  useEffect(() => {
      document.getElementById(`project${activeProject}`).scrollIntoView()
  }, [])

  return (
    <div className={cx.container}>
      {
        (Array(4).fill(null)).map((_, idx) => (

          <div
            id={`project${idx + 1}`}
            key={idx}
            className={`${cx.project} ${activeProject === String(idx + 1) && cx.active} ${view && cx.viewMode} `}
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
  inview: selectInview,
  view: selectView
})

const mapDispatchToProps = dispatch => ({
  setActiveProject: projectId => dispatch(setActiveProject(projectId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWindow);