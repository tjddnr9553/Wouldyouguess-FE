import './Loading.css'
import Star from '../background/Star';

const Loading = () => {
    return (
      <>
        <Star />
        <div className='loading content'>
          <div data-js="astro" className="astronaut">
            <div className="head"></div>
            <div className="arm arm-left"></div>
            <div className="arm arm-right"></div>
            <div className="body">
                <div className="panel"></div>
            </div>
            <div className="leg leg-left"></div>
            <div className="leg leg-right"></div>
            <div className="schoolbag"></div>
          </div>

          <p>loading</p>
        </div>
      </>
    )
}

export default Loading;