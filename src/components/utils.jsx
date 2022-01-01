export const toSentenceCase = str => {
  let first = str[0].toUpperCase()
  return first + str.slice(1)
}












// import React, { useEffect, useRef, useState } from 'react'
// import cx from './Welcome.module.css';

// const Utils = () => {
//   const [state, setState] = useState({
//     build: false,
//     view: false,
//     pick: false,
//     scrollId: "0",
//     projects: {
//       "1": 0,
//       "2": 0,
//       "3": 0,
//       "4": 0
//     }
//   });
//   const { build, view, pick, scrollId, projects } = state;

//   const handleSetState = (obj) => {
//     setState(state => ({ ...state, ...obj }))
//   }

//   const projectWindowRef = useRef(null)
//   const homeWrapperRef = useRef(null)

//   useEffect(() => {
//     handleSetState({ build: true })
//     try {
//       homeWrapperRef.current
//         .onanimationend = () => {
//           handleSetState({ view: true })
//           handleSetState({ build: false })
//           handleSetState({ scrollId: 1 })
//         }
//     } catch (error) {
//       console.log('componentDidMount');
//     }
//   }, [])

//   useEffect(() => {
//     try {
//       document.getElementById(`project${scrollId}`).scrollIntoView()
//     } catch (error) { }
//   }, [scrollId])

  // const calcView = () => {
  //   const values = Object.values(projects);
  //   let min = Number.MAX_SAFE_INTEGER;
  //   for (let val of values) {
  //     if (min > val && val > 0) {
  //       min = val
  //     }
  //   }
  //   let id = Object.keys(projects).find(key => projects[key] === min)
  //   return id
  // }

  // useEffect(() => {
  //   try {
  //     console.log(calcView());
  //     // clearInterval(isScrolling)
  //     // isScrolling = setTimeout(function () {
  //     //   console.log('Scrolling has stopped.');
  //     //   // document.getElementById(`project${2}`).scrollIntoView()
  //     // }, 1000);
  //   } catch (error) {}
  // }, [projects])

  // useEffect(() => {
  //   try {
  //     projectWindowRef.current
  //       .addEventListener("scroll", () => {
  //         handleSetState({
  //           projects: {
  //             ...projects,
  //             "4": parseInt(document
  //               .getElementById("project4")
  //               .getBoundingClientRect().top),
  //             "3": parseInt(document
  //               .getElementById("project3")
  //               .getBoundingClientRect().top),
  //             "2": parseInt(document
  //               .getElementById("project2")
  //               .getBoundingClientRect().top),
  //             "1": parseInt(document
  //               .getElementById("project1")
  //               .getBoundingClientRect().top)
  //           }
  //         })
  //       })
  //   } catch (error) { }
  // }, [])



//   return (
//     <div className={cx.container}>
//       <h1>Utils back</h1>

//       <div ref={homeWrapperRef}
//         className={` ${cx.homeWrapper} ${build && cx.build} ${view && cx.view}`}
//       >
//       </div>

//       <div
//         ref={projectWindowRef}
//         className={`${cx.projectWindow} ${view && cx.tilt} ${pick && cx.center}`}>
//         <div id='projectsId' className={` ${cx.projectWrapper} ${build && cx.slideIn}`} >
//           {
//             (Array(4).fill(null)).map((_, idx) => (
//               <div id={`project${idx + 1}`} key={idx} className={`${cx.project} `}>
//                 <h1>projects-{idx + 1}</h1>
//                 {String(build)}
//               </div>
//             ))
//           }
//         </div>
//       </div>

//       <div className={`${cx.projectWindowOverlay} ${pick && cx.show}`}></div>

//       <div
//         className={cx.selectorContainer}
//         onMouseOut={() => handleSetState({ pick: false })}
//         onMouseOver={() => handleSetState({ pick: true })}
//       >
//         <div
//           onMouseOver={() => handleSetState({ scrollId: "1" })}
//           className={cx.selector}
//         >project1</div>

//         <div
//           onMouseOver={() => handleSetState({ scrollId: "2" })}
//           className={cx.selector}
//         >project2</div>

//         <div
//           onMouseOver={() => handleSetState({ scrollId: "3" })}
//           className={cx.selector}
//         >project3</div>
//         <div
//           onMouseOver={() => handleSetState({ scrollId: "4" })}
//           className={cx.selector}
//         >project4</div>

//       </div>



//     </div>
//   )
// }

// export default Utils