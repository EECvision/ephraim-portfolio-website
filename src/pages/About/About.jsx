import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from './About.module.css';

const About = () => {
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
    setTimeout(() => {
      history.push('/home')
    }, 1500);
    setView(false)
  }

  return (
    <div className={`${cx.aboutContainer} ${view && cx.view}`}>
      <nav className={cx.nav}>
        <div className={cx.backBtn} onClick={handleBack}>Back</div>
        <div>email contact</div>
      </nav>

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
    </div>

  )
}

export default About;