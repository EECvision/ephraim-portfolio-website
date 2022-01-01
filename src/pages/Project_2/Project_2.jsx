import React, { useEffect, useState } from "react"
import { connect } from "react-redux";
import { toSentenceCase } from "../../components/utils";
import { setCurrentPage } from "../../state/page/page.actions";
import cx from './Project_2.module.css';

const ProjectTwo = ({ setCurrentPage, activeProject }) => {
  const { projectTitle, projectDescription, caseStudy, background, mainColor, textColor } = activeProject

  const [state, setState] = useState({
    center: false,
    back: false,
    close: false,
  });
  const { center, back, close } = state;

  const handleSetState = (obj) => {
    setState(state => ({ ...state, ...obj }))
  }

  const handlePageClick = (page) => {
    handleSetState({ back: true })
    setTimeout(() => {
      setCurrentPage(page)
    }, 1300);
  }

  useEffect(() => {
    handleSetState({ center: true })
    handleSetState({ back: false })
  }, [])

  useEffect(() => {
    try {
      document.getElementById("swipe")
        .onanimationend = (e) => {
          console.log('ended', e);
          if (e.animationName.includes('openSwiper')) {
            handleSetState({ close: true })
          } else if (e.animationName.includes('closeSwiper')) {
            handleSetState({ home: true })
          }
        }
    } catch (error) {
      console.log('componentDidMount');
    }
  }, [])

  return (
    <div className={`${cx.container}`}>
      <div id="swipe" style={{background: mainColor}} className={`${cx.swiper} ${back && cx.swipeOpen} ${close && cx.swipeClose}`}></div>

      <div className={`${cx.wrapper} ${close && cx.hide}`}>
        <div className={cx.fixed}>
          <div style={{background: mainColor}} className={`${cx.bg} ${center && cx.center}`}></div>
          <div className={`${cx.card} ${center && cx.center}`}></div>
          <div className={`${cx.projectTitle} ${center && cx.center}`}>{toSentenceCase(projectTitle)}</div>
        </div>
        <div className={cx.transparent}></div>

        <div className={cx.content}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* <button onClick={() => handleSetState({ center: !center })}>click</button> */}
        <button onClick={() => handlePageClick('/')}>back</button>
      </div>

    </div >
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(ProjectTwo)