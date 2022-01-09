import { connect } from 'react-redux';
import { setInview } from '../../state/page/page.actions';
import cx from './Mobile_Project_Selector.module.css';


const MobileProjectSelector = ({setInview, props: { projectTitle, mainColor } }) => {

  const handleClick = id => {
    setInview(id)
  }

  return (
    <div className={cx.container}>
      <div
        onMouseOver={() => handleClick(1)}
        style={projectTitle === 'esperanto' ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>

      <div
        onMouseOver={() => handleClick(2)}
        style={projectTitle === 'ueno' ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>


      <div
        onMouseOver={() => handleClick(3)}
        style={projectTitle === 'iv-skaya' ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>

      <div
        onMouseOver={() => handleClick(4)}
        style={projectTitle === 'snicksnack' ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setInview: projectId => dispatch(setInview(projectId)),
})


export default connect(null, mapDispatchToProps)(MobileProjectSelector)