import { useEffect } from 'react';
import { useState } from 'react';
import cx from './MyProcess.module.css';

const process = [
  {
    id: '01',
    title: 'strategy',
    description: 'Focusing on strategy, It’s always important for me to understand that we’re trying to accomplish the right challenges through asking the right questions before jumping into designing. Steps taken during this stage is usually stake holders interview, concept sketching, and value proposition mapping.'
  },
  {
    id: '02',
    title: 'empathize',
    description: 'In this phase I try to gain an empathetic understanding of the problem I’m trying to solve using research. Empathizing with users allows me to set aside my assumption and gain real insight into users and their needs'
  },
  {
    id: '03',
    title: 'define',
    description: 'At this stage I condense and analyze all the information gathered on empathize phase and synthesize them to define the core problem. I then create Problem statement, user journey maps, and Personas to keep my efforts human-centered before proceeding to Ideation.  '
  },
  {
    id: '04',
    title: 'ideate',
    description: 'During this phase, I brainstorm on multiple innovative approaches to solving the problem identified from the previous stage. This stage is particularly helpful for creating userflows and information architecture.'
  },
  {
    id: '05',
    title: 'prototype',
    description: 'At the end of this phase you’ll have a pixel perfect design of your product. During the transition from low-fidelity wireframes into the final high-fidelity design I create clickable prototypes simulating final end results before development. At this stage, I also create a design system or a style guide.'
  },
  {
    id: '06',
    title: 'lunch',
    description: 'Time to implement! I ensure a proper hand-over of the finished designs to the developer, once it’s delivered, I can test the final product, analyze the results and iterate where possible.'
  }
]

const MyProcess = () => {

  const [show, toggleShow] = useState(false)
  const [clicked, setClicked] = useState('')

  const handleShowDescription = id => {
    if (id === clicked) return toggleShow(!show) 
    toggleShow(true)
    setClicked(id)
  }

  return (
    <div className={cx.container}>
      {
        process.map(({ id, title, description }, idx) => (
          <div className={cx.wrapper}>
            <div key={idx} className={cx.heading} onClick={() => handleShowDescription(id)}>
              <div className={cx.title}>
                <div>{id}</div>
                <div>{title}</div>
              </div>
              <img src='./assets/Expand_down_double.svg' className={cx.toggleIcon}/>
            </div>
            <div className={`${cx.description} ${(show && id === clicked) ? cx.show : cx.hide}`}>{description}</div>
          </div>
        ))
      }

    </div>
  )
}

export default MyProcess;