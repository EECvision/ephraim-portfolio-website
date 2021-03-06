import React, { useEffect, useState, useRef } from "react"
import { connect } from "react-redux";
import { calcView, toSentenceCase } from "../../components/utils";
import cx from './Project.module.css';
import projectData from '../../state/DATA.json';
import { useHistory } from "react-router-dom";
import { getProject } from "./Project_Script";
import { useParams } from "react-router-dom";
import { setCurrentPage, setMount } from "../../state/page/page.actions";
import useWidth from "../../components/Hooks/useWidth";

const Project = ({ setCurrentPage, setMount }) => {
  const params = useParams();
  const { projectTitle, mainColor } = projectData[params.id]
  const [state, setState] = useState({
    center: false,
    back: false,
    close: false,
    contentId: 0,
    activeContentId: "0",
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
  const { width } = useWidth();

  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const domMountRef = useRef(false);
  const history = useHistory();

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
    setMount(false)
    handleSetState({ back: true })
    setCurrentPage(page === "about" ? "project" : "home")
    setTimeout(() => {
      history.push(`/${page}`)
    }, page === "about" ? 1500 : 0);
  }

  const handleNext = () => {
    if (Number(params.id) === 4) {
      history.push(`/project/${1}`)
    } else {
      history.push(`/project/${Number(params.id) + 1}`)
    }
  }

  const handlePrev = () => {
    if (Number(params.id) === 1) {
      history.push(`/project/${4}`)
    } else {
      history.push(`/project/${Number(params.id) - 1}`)
    }
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
    } catch (error) { }
  }, [])

  useEffect(() => {
    const getScroll = () => {
      if (scroll < 100) return scroll
      return 100
    }
    const getOffset = () => {
      let container = containerRef.current;
      let scrollTop = container.scrollTop
      let scrollHeight = container.scrollHeight
      let clientHeight = container.clientHeight
      if (scrollHeight - scrollTop < clientHeight + (0.3 * clientHeight)) return true;
      return false
    }

    if (width > 1024) {
      titleRef.current.style.transform = `translateY(${-(getScroll() / 100 * 100)}px)`
      cardRef.current.style.transform = `
        rotateY(${-(getScroll() / 80) * 30}deg) 
        translateX(${(getScroll() / 80) * 320}px) 
        translateY(${(getScroll() / 1) * 0}px)
      `
    } else {
      titleRef.current.style.transform = `translateY(${-(getScroll() / 100 * 100)}px)`
      cardRef.current.style.transform = `
        rotateY(${(getScroll() / 1) * 0}deg) 
        translateX(${(getScroll() / 1) * 0}px) 
        translateY(${(getScroll() / 100) * 100}px) 
      `
    }

    document.getElementById("contentNav").style.opacity = (getScroll() / 100) * 1
    document.getElementById("routeBtn").style.display = getOffset() ? 'flex' : 'none'

  }, [scroll])

  useEffect(() => {
    if (domMountRef.current) {
      let id = calcView(projectContents, -200)
      console.log(id);
      if (activeContentId !== id) handleSetState({ activeContentId: id })
      if (projectContents["1"] > 60) {
        handleSetState({ activeContentId: "0" })
        handleSetState({ contentId: 0 })
      }
    }
    domMountRef.current = true
  }, [projectContents])

  useEffect(() => {
    try {
      const projectContent = document.getElementById("projectContent").children;
      projectContent[contentId - 1].scrollIntoView()
    } catch (error) { }
  }, [contentId])

  useEffect(() => {
    let container = document.getElementById("transparent")
    container.scrollIntoView();
  }, [params.id])

  return (
    <div ref={containerRef} onScroll={handlePageScroll} className={`${cx.container}`}>
      <div className={cx.innerText}>Ephraim</div>
      <div id="swipe" style={{ background: mainColor }} className={`${cx.swiper} ${back && cx.swipeOpen} ${close && cx.swipeClose}`}></div>
      <nav style={activeContentId !== "0" ? { color: 'black' } : {}} className={cx.nav}>
        <div onClick={() => handlePageClick('')}>
          <i className="fas fa-arrow-left"></i> <span>back home</span>
        </div>
        <div onClick={() => handlePageClick('about')}>About</div>
      </nav>

      <div className={`${cx.wrapper} ${close && cx.hide}`}>
        <div className={cx.fixed}>
          <div style={{ background: mainColor }} className={`${cx.bg} ${center && cx.center}`}></div>
          <div ref={cardRef} className={`${cx.card} ${center && cx.center}`}></div>
          <div ref={titleRef} className={`${cx.projectTitle} ${center && cx.center}`}>{toSentenceCase(projectTitle)}</div>
        </div>
        <div id="transparent" className={cx.transparent}>
          <div onClick={() => handleSetState({ contentId: 1 })} className={cx.arrowDown}>
            <i className="fas fa-arrow-down"></i>
          </div>
        </div>

        <div className={cx.contentWrapper}>
          {getProject(params.id)}
          <div id="contentNav" className={cx.contentNav}>
            <div
              onClick={() => handleSetState({ contentId: 1 })}
              className={` ${cx.navItem} ${activeContentId === '1' && cx.active}`}
            >nav test nav 1</div>
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

            <div className={cx.routeBtn}>
              <div onClick={handlePrev} className={cx.prev}>prev</div>
              <div onClick={handleNext} className={cx.next}>next</div>
            </div>
          </div>

          <div id="routeBtn" className={`${cx.routeBtn} ${cx.out}`}>
            <div onClick={handlePrev} className={cx.prev}>prev</div>
            <div onClick={handleNext} className={cx.next}>next</div>
          </div>

        </div>
      </div>
    </div >
  )
}

const mapDispatchToProps = dispatch => ({
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  setMount: state => dispatch(setMount(state))
})

export default connect(null, mapDispatchToProps)(Project)