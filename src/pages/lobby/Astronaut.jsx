import './Astronaut.css'

const Astronaut = ({handleMouseEnter}) => {
    
    return (
        <div className="box_astronaut" onClick={handleMouseEnter}>
            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
        </div>
    )
}

export default Astronaut;