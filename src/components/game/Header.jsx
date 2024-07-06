import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="left-item"></div>
      <div className="center-item">
        <div className="logo-img"> 
          <img src='/images/logo/mini-logo.png' alt='img' />
        </div>
      </div>
      <div className="right-item">
        {/* <button className="ranking"> 랭킹 </button> */}
      </div>
    </div>
  )
}

export default Header;