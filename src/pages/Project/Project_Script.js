import ProjectOne from "../../components/Project_1";
import ProjectTwo from "../../components/Project_2";
import ProjectThree from "../../components/Project_3";
import ProjectFour from "../../components/Project_4";

export const getProject = id => {
  switch (id) {
    case "1": return <ProjectOne />
    case "2": return <ProjectTwo />
    case "3": return <ProjectThree />
    case "4": return <ProjectFour />
    default:
      return null
  }
}