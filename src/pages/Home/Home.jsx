import { useEffect } from 'react';
import cx from './Home.module.css';


const Home = () => {

  useEffect(()=> {
    document.getElementById("wheel").onwheel = e => {
      const {wheelDelta, wheelDeltaX, wheelDeltaY} = e
      console.log(wheelDelta);
    }
  },[])

  return (
    <div>
      <h1>Home</h1>
      <div id='wheel' className={cx.wheel}>wheel</div>
    </div>
  )
}

export default Home