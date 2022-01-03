import cx from './Mobile_Project_Selector.module.css';


const MobileProjectSelector = ({ props: { projectTitle, mainColor } }) => {

  return (
    <div className={cx.container}>
      <div
        style={projectTitle === 'esperanto' ? { background: mainColor } : {}}
        className={cx.draw}>
      </div>

      <div
        style={projectTitle === 'ueno' ? { background: mainColor } : {}}
        className={cx.draw}>
      </div>


      <div
        style={projectTitle === 'iv-skaya' ? { background: mainColor } : {}}
        className={cx.draw}>
      </div>

      <div
        style={projectTitle === 'snicksnack' ? { background: mainColor } : {}} id="draw-selector"
        className={cx.draw}>
      </div>
    </div>
  )
}


export default MobileProjectSelector