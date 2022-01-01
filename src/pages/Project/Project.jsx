import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { calcView, toSentenceCase } from "../../components/utils";
import { selectActiveProject } from "../../state/page/page.selector";
import cx from './Project.module.css';
import projectData from '../../state/DATA.json';
import { useHistory } from "react-router-dom";
import { getProject } from "./Project_Script";
import { useParams } from "react-router-dom";
import { setCurrentPage } from "../../state/page/page.actions";

const Project = ({ setCurrentPage }) => {
  const params = useParams();
  const { projectTitle, mainColor } = projectData[params.id]
  const [state, setState] = useState({
    center: false,
    back: false,
    close: false,
    contentId: 0,
    activeContentId: 0,
    projectContents: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
    }
  });
  const { center, back, close, projectContents, contentId, activeContentId } = state;
  const [scroll, setScroll] = useState(0);

  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const history = useHistory()

  const handleSetState = (obj) => {
    setState(state => ({ ...state, ...obj }))
  }

  const handlePageScroll = () => {
    const projectContent = document.getElementById("projectContent").children;
    let container = containerRef.current;
    let scrollHeight = container.scrollTop;
    let clientHeight = container.clientHeight;
    let scrolled = (scrollHeight / clientHeight) * 100;
    setScroll(scrolled)
    handleSetState({
      projectContents: {
        ...projectContents,
        "6": parseInt(projectContent[5]
          .getBoundingClientRect().top),
        "5": parseInt(projectContent[4]
          .getBoundingClientRect().top),
        "4": parseInt(projectContent[3]
          .getBoundingClientRect().top),
        "3": parseInt(projectContent[2]
          .getBoundingClientRect().top),
        "2": parseInt(projectContent[1]
          .getBoundingClientRect().top),
        "1": parseInt(projectContent[0]
          .getBoundingClientRect().top)
      }
    })
  }

  const handleScrollTop = () => {
    let container = document.getElementById("transparent")
    container.scrollIntoView();
    handleSetState({ contentId: 0 })
  }

  const handlePageClick = (page) => {
    handleSetState({ back: true })
    setCurrentPage(page === "about" ? "project" : "home")
    setTimeout(() => {
      history.push(`/${page}`)
    }, page === "about" ? 1500 : 0);
  }

  useEffect(() => {
    try {
      handleSetState({ center: true })
      document.getElementById("swipe")
        .onanimationend = (e) => {
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

  useEffect(() => {
    const getScroll = () => {
      if (scroll < 100) return scroll
      return 100
    }
    titleRef.current.style.transform = `translateY(${-(getScroll() / 100 * 100)}px)`
    cardRef.current.style.transform = `
      rotateY(${-(getScroll() / 100) * 45}deg) 
      rotateX(${(getScroll() / 100) * 30}deg) 
      translateX(${(getScroll() / 100) * 320}px) 
      translateY(${-((scroll / 100) * 100)}px)
    `
    document.getElementById("contentNav").style.opacity = (getScroll() / 100) * 1
  }, [scroll])

  useEffect(() => {
    let id = calcView(projectContents, -100)
    if (activeContentId !== id) handleSetState({ activeContentId: id })
    if (projectContents["1"] > 200) {
      handleSetState({ activeContentId: 0 })
      handleSetState({ contentId: 0 })
    }
  }, [projectContents])

  useEffect(() => {
    try {
      const projectContent = document.getElementById("projectContent").children;
      projectContent[contentId - 1].scrollIntoView()
    } catch (error) { }
  }, [contentId])

  return (
    <div ref={containerRef} onScroll={handlePageScroll} className={`${cx.container}`}>
      <div id="swipe" style={{ background: mainColor }} className={`${cx.swiper} ${back && cx.swipeOpen} ${close && cx.swipeClose}`}></div>
      <nav className={cx.nav}>
        <div onClick={() => handlePageClick('')}>Back</div>
        <div onClick={() => handlePageClick('about')}>About</div>
      </nav>

      <div className={`${cx.wrapper} ${close && cx.hide}`}>
        <div className={cx.fixed}>
          <div style={{ background: mainColor }} className={`${cx.bg} ${center && cx.center}`}></div>
          <div ref={cardRef} className={`${cx.card} ${center && cx.center}`}></div>
          <div ref={titleRef} className={`${cx.projectTitle} ${center && cx.center}`}>{toSentenceCase(projectTitle)}</div>
        </div>
        <div id="transparent" className={cx.transparent}>
          <div onClick={() => handleSetState({ contentId: 1 })} className={cx.arrowDown}>arrow down</div>
        </div>

        <div className={cx.contentWrapper}>
          {getProject(params.id)}
          <div id="contentNav" className={cx.contentNav}>
            <div
              onClick={() => handleSetState({ contentId: 1 })}
              className={` ${cx.navItem} ${activeContentId === '1' && cx.active}`}
            >nav 1</div>
            <div
              onClick={() => handleSetState({ contentId: 2 })}
              className={` ${cx.navItem} ${activeContentId === '2' && cx.active}`}
            >nav 2</div>
            <div
              onClick={() => handleSetState({ contentId: 3 })}
              className={` ${cx.navItem} ${activeContentId === '3' && cx.active}`}
            >nav 3</div>
            <div
              onClick={() => handleSetState({ contentId: 4 })}
              className={` ${cx.navItem} ${activeContentId === '4' && cx.active}`}
            >nav 4</div>
            <div
              onClick={() => handleSetState({ contentId: 5 })}
              className={` ${cx.navItem} ${activeContentId === '5' && cx.active}`}
            >nav 5</div>
            <div
              onClick={() => handleSetState({ contentId: 6 })}
              className={` ${cx.navItem} ${activeContentId === '6' && cx.active}`}
            >nav 6</div>
            <div className={cx.backToTop} onClick={handleScrollTop}>back to top</div>
          </div>
        </div>
      </div>
    </div >
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page))
})

export default connect(null, mapDispatchToProps)(Project)