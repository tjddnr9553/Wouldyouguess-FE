import './Header.css'

const Header = ({text, leftItem, rightItem}) => {
  return (
    <div className='header'>
      <div className="leftItem">{leftItem}</div>
      <h1 className='header_title'>{text}</h1>
      <div className="rightItem">{rightItem}</div>
    </div>
  )
}

export default Header;