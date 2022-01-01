import About from '../About/About';
import Home from '../Home/Home';
import ProjectOne from '../Project_1/Project_1';
import ProjectTwo from '../Project_2/Project_2';
import ProjectThree from '../Project_3/Project_3';
import ProjectFour from '../project_4/Project_4';
import cx from './Welcome.module.css';

export const getActiveProject = (currentPage, activeProject) => {

  switch (currentPage) {
    case 'project-1':
      return (
        <div className={cx.projectContainer}>
          <ProjectOne/>
        </div>
      )
    case 'project-2':
      return (
        <div className={cx.projectContainer}>
          <ProjectTwo/>
        </div>
      )
    case 'project-3':
      return (
        <div className={cx.projectContainer}>
          <ProjectThree/>
        </div>
      )
    case 'project-4':
      return (
        <div className={cx.projectContainer}>
          <ProjectFour/>
        </div>
      )
    case 'about':
      return (
        <div className={cx.aboutContainer}>
          <About/>
        </div>
      )
    default:
      return null;
  }
}

export const calcView = (projects, offset=-1) => {
    const values = Object.values(projects);
    let min = Number.MAX_SAFE_INTEGER;
    for (let val of values) {
      if (min > val && val > offset) {
        min = val
      }
    }
    let id = Object.keys(projects).find(key => projects[key] === min)
    return id
  }