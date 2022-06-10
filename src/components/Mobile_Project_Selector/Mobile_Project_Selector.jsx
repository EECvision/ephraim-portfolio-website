import { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setInview } from '../../state/page/page.actions';
import { selectInview } from '../../state/page/page.selector';
import cx from './Mobile_Project_Selector.module.css';


const MobileProjectSelector = ({setInview, props: { id, mainColor } }) => {

  const handleClick = id => {
    setInview(id)
  }

  return (
    <div className={cx.container}>
      <div
        onMouseOver={() => handleClick(1)}
        style={id === 1 ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>

      <div
        onMouseOver={() => handleClick(2)}
        style={id === 2 ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>


      <div
        onMouseOver={() => handleClick(3)}
        style={id === 3 ? { background: mainColor } : {}}
        className={cx.selector}>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  inview: selectInview
})

const mapDispatchToProps = dispatch => ({
  setInview: projectId => dispatch(setInview(projectId)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MobileProjectSelector)