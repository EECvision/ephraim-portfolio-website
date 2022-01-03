export const toSentenceCase = str => {
  let first = str[0].toUpperCase()
  return first + str.slice(1)
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

