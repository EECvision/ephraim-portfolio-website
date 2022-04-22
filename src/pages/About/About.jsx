import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import MyProcess from '../../components/Process/MyProcess';
import { setMount } from '../../state/page/page.actions';
import { selectCurrentPage, selectInview } from '../../state/page/page.selector';
import cx from './About.module.css';


const About = ({ inView, currentPage, setMount }) => {
  const [view, setView] = useState(false);
  const [clipboard, setClipboard] = useState('copy to clipboard');
  const domMountRef = useRef(true);
  const clipboardRef = useRef(null);
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

  const handleCopy = () => {
    clipboardRef.current.select();
    clipboardRef.current.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(clipboardRef.current.value);
    setClipboard('copied')
  }

  const handleRest = () => {
    setTimeout(() => {
      setClipboard('copy to clipboard')
    }, 300);
  }

  return (
    <div className={cx.aboutWrapper}>
      <nav className={cx.nav}>
        <div className={cx.backBtn} onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> <span>back</span>
        </div>
        <div className={cx.emailContainer}>
          <div className={cx.email}>ephraimsopuruchukwu@gmail.com</div>
          <div onMouseOut={handleRest} onClick={handleCopy} className={cx.clipboard}>{clipboard}</div>
          <input style={{ display: 'none' }} ref={clipboardRef} type="text" defaultValue={'ephraimsopuruchukwu@gmail.com'} />
        </div>
      </nav>

      <div className={cx.innerText}>Buchi</div>

      <div className={`${cx.aboutContainer} ${view && cx.view}`}>
        <section className={cx.profile}>
          <div className={cx.imageContainer}>
            <img src="/assets/sop.png" alt="" />
          </div>

          <div className={cx.info}>
            <h1 className={cx.hello}>Hello,</h1>
            <p className={cx.name}>I’m Ephraim</p>
            <p className={cx.about}>
              I’m a product and graphics designer. <br />
              As a product designer, I’m passionate about creating interactive, useful, and delightful user experiences. <br />
              I prioritize centering design processes around users when designing to solve complex problems that help businesses grow.
            </p>
            <div className={cx.link}>
              <p className={cx.linkText}>Got a project idea, let's talk about it</p>
              <div className={cx.linkBtn}></div>
            </div>
            <div className={cx.contactAndResumeWrapper}>
              <div className={cx.links}>
                <li className={cx.linkIcon}>
                  <img src="./assets/Linkedin.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Behance.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Dribbble.svg" alt="" />
                </li>
              </div>
              <div className={cx.resume}>
                <span>download resume</span> <img src="./assets/download_2_line.svg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className={cx.getToknowMeContainer}>
          <h3>get to know me</h3>
        </section>
        <section className={cx.carouselWrapper}>
          <div className={cx.carousel}>
            <div>Human<img src="./assets/Heart.svg" alt="" />,</div>
            <div>Friendly,</div>
            <div>Collaborative,</div>
            <div>Natural</div>
            <div>Curiosity,</div>
            <div>Creative,</div>
            <div>Good communicator,</div>
            <div>Always learning</div>
            <div>Human<img src="./assets/Heart.svg" alt="" />,</div>
            <div>Friendly,</div>
            <div>Collaborative,</div>
            <div>Natural</div>
            <div>Curiosity,</div>
            <div>Creative,</div>
            <div>Good communicator,</div>
            <div>Always learning</div>
            <div>Human<img src="./assets/Heart.svg" alt="" />,</div>
            <div>Friendly,</div>
            <div>Collaborative,</div>
            <div>Natural</div>
            <div>Curiosity,</div>
            <div>Creative,</div>
            <div>Good communicator,</div>
            <div>Always learning</div>
          </div>
        </section>
        <section className={cx.projectSection}>
          <div className={cx.one}>
            <div className={cx.left}>
              <div className={cx.number}>01</div>
              <div className={cx.function}>What I can do for you</div>
            </div>
            <div className={cx.right}>
              <h3>UI/UX AND GRAPHIC DESIGNS</h3>
              <br />
              <p> Whether your goal is to generate leads, start selling, improve your ecommerce, build a converting blockchain website or have your own space in the digital world, connecting with the users’ emotions is key.</p>
              <br />
              <p>That's why I design digital solutions that help create the connection between your business and customers by combining designs and creative ideas into a beautiful and usable products.</p>
              <br />
              <p>Using a pixel perfect approach, I ensure usability is taken care of to the last detail.</p>
            </div>
          </div>
          <div className={cx.two}>
            <div className={cx.left}>
              <div className={cx.number}>02</div>
              <div className={cx.function}>My Process</div>
            </div>
            <div className={cx.right}>
              <MyProcess />
            </div>
          </div>
        </section>
        <section className={cx.workSection}>
          <h1 className={cx.workSectionHeading}>Thanks for reading</h1>
          <div style={{ backgroundImage: ' url(./assets/work-station.png)' }} className={cx.workSectionImageContainer} />
        </section>
        <footer className={cx.footer}>
          <div className={cx.fTop}>
            <div className={cx.fLeft}>
              <div className={cx.fLeftHeading} >Let's work together</div>
              <div>Got a project idea on your mind? Or perhaps you need a devoted product designer for your team? I’m one email away from building with you.</div>


              <div className={cx.emailContainer}>
                <div className={cx.email}>ephraimsopuruchukwu@gmail.com</div>
                <div onMouseOut={handleRest} onClick={handleCopy} className={cx.clipboard}>{clipboard}</div>
                <input style={{ display: 'none' }} ref={clipboardRef} type="text" defaultValue={'ephraimsopuruchukwu@gmail.com'} />
              </div>

            </div>
            <div className={cx.fRight}>
              <div className={cx.fLeftHeading}>get in touch</div>
              <ul className={cx.links}>
                <li className={cx.linkIcon}>
                  <img src="./assets/Instagram.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Twitter.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Linkedin.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Behance.svg" alt="" />
                </li>
                <li className={cx.linkIcon}>
                  <img src="./assets/Dribbble.svg" alt="" />
                </li>
              </ul>
              <div className={cx.base}>Based in Nigeria, Available worldwide</div>
            </div>
          </div>
          <div className={cx.fBottom}>
            <div className={cx.code}>
              <img src="./assets/Heart-white.svg" alt="" /> <span>code by <span className={cx.devName}>Emmanuel Ezeka</span></span> <div className={cx.underline}></div>
            </div>
            <div className={cx.end}>
              <img src="./assets/copyright.svg" alt="" /> <span>2022 - All right reserved</span></div>
          </div>
        </footer>
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