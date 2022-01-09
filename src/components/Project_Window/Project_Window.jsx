import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectInview, selectView } from '../../state/page/page.selector';
import cx from './Project_Window.module.css';


const ProjectWindow = ({ inview, view }) => {
  
  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push(`/project/${id}`)
  }

  useEffect(() => {
    document.getElementById(`project${inview}`).scrollIntoView()
  }, [inview])

  return (
    <div className={cx.container}>
      {
        (Array(4).fill(null)).map((_, idx) => (

          <div
            id={`project${idx + 1}`}
            key={idx}
            className={`${cx.project} ${inview === idx + 1 && cx.active} ${view && cx.viewMode} `}
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
  inview: selectInview,
  view: selectView
})

export default connect(mapStateToProps)(ProjectWindow);