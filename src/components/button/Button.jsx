import './Button.css'

const Button = ({text, }) => {
  return (
    <button className="img-button" >
      <img src='/images/btn/basic_btn.png' alt="btn" className="btn-img" />
      <div className="btn-start">START</div>
    </button>
  )
}

export default Button;