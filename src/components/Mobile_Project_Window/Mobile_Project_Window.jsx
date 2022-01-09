import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectInview } from '../../state/page/page.selector';
import cx from './Mobile_Project_Window.module.css';


const MobileProjectWindow = ({ inview }) => {

  const history = useHistory();
  const handleProjectClick = (id) => {
    history.push(`/project/${id}`)
  }

  useEffect(() => {
    document.getElementById(`project-mobile${inview}`).scrollIntoView()
  }, [inview])

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
  inview: selectInview
})

export default connect(mapStateToProps)(MobileProjectWindow);