import './Keyword.css'

const Keyword = ({keyword}) => {
    
  return (
    <div className="keyword" id="container">
        <div className="container" id="container">
          <header>
            <h1>{keyword}</h1>
            <span aria-hidden="true" className="copy copy-1">{keyword}</span>
            <span aria-hidden="true" className="copy copy-2">{keyword}</span>
            <span aria-hidden="true" className="copy copy-3">{keyword}</span>
            <span aria-hidden="true" className="copy copy-4">{keyword}</span>
            </header>
        </div>
    </div>
    )
};

export default Keyword;