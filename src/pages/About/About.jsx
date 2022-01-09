import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { setMount } from '../../state/page/page.actions';
import { selectCurrentPage, selectInview } from '../../state/page/page.selector';
import cx from './About.module.css';

const About = ({ inView, currentPage, setMount }) => {
  const [view, setView] = useState(false);
  const domMountRef = useRef(true);
  const history = useHistory()

  useEffect(() => {
    if (domMountRef.current === true) {
      setView(true)
    }
    domMountRef.current = false
  }, [view])

  const handleBack = () => {
    setMount(false)
    setTimeout(() => {
      if (currentPage === "home") {
        history.push('/')
      } else {
        history.push(`/project/${inView}`)
      }
    }, currentPage === "home" ? 0 : 1500);
    setView(false)
  }

  return (
    <div className={cx.aboutWrapper}>
      <nav className={cx.nav}>
        <div className={cx.backBtn} onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> <span>back home</span>
        </div>
        <div className={cx.email}>email contact</div>
      </nav>

      <div className={cx.innerText}>Buchi</div>

      <div className={`${cx.aboutContainer} ${view && cx.view}`}>
        <div className={cx.profile}>
          <div className={cx.imageContainer}></div>

          <div className={cx.info}>
            <h1 className={cx.name}>Hello, <br /> I'm Ephraim</h1>
            <p className={cx.about}>I am Nigerian Designer based in Nigeria and available for full-time roles and freelance projects</p>
            <div className={cx.contact}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className={cx.moreContent}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto consequuntur dolorum eligendi nobis! Ut veritatis aliquam est dolores repudiandae! Aliquid nihil itaque pariatur numquam assumenda doloremque omnis eum odio maxime!
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  inView: selectInview,
  currentPage: selectCurrentPage
})

const mapDispatchToProps = dispatch => ({
  setMount: state => dispatch(setMount(state)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(About);