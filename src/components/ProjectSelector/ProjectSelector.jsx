import { connect } from "react-redux"
import { setInview, setView } from "../../state/page/page.actions"
import { useEffect, useState } from 'react';
import cx from './ProjectSelector.module.css';


const ProjectSelector = ({ setInview, setView, props: { projectTitle, mainColor } }) => {

  const [expand, setExpand] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleMouseLeave = () => {
    setExpand(true)
    setShowText(false)
    setView(false)
  }

  const handleMouseEnter = () => {
    setExpand(true)
    setShowText(true)
    setView(true)
  }

  useEffect(() => {
    try {
      const draw = document.getElementById("draw-selector");
      draw.onanimationend = e => {
        setExpand(false)
      }
    } catch (error) { }
  }, [])

  return (
    <div className={cx.container}>
      <div className={cx.drawContainer} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div onMouseOver={() => setInview(1)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>esperanto</div>
          <div
            style={projectTitle === 'esperanto' ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._1}`}>
          </div>
        </div>

        <div onMouseOver={() => setInview(2)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>ueno</div>
          <div
            style={projectTitle === 'ueno' ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._2}`}>
          </div>
        </div>

        <div onMouseOver={() => setInview(3)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>iv-skaya</div>
          <div
            style={projectTitle === 'iv-skaya' ? { background: mainColor } : {}}
            className={`${cx.draw} ${expand && cx.expand} ${cx._3}`}>
          </div>
        </div>

        <div onMouseOver={() => setInview(4)} className={cx.drawWrapper}>
          <div className={`${cx.text} ${showText && cx.show}`}>snicksnack</div>
          <div
            style={projectTitle === 'snicksnack' ? { background: mainColor } : {}} id="draw-selector"
            className={`${cx.draw} ${expand && cx.expand} ${cx._4}`}>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setInview: projectId => dispatch(setInview(projectId)),
  setView: state => dispatch(setView(state))
})

export default connect(null, mapDispatchToProps)(ProjectSelector)