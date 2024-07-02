import styled from "styled-components";

const Palette = () => {
  return (
    <div className="palette">
      <Temp />
    </div>
  )
}

export default Palette;

const Temp = styled.div`
  width: 180px;
  background-color: gray;
  height: 350px;
`