import "./Invite.css";

const Invite = ({ ...props }) => {
  return (
    <div>
      <button className="neo-pop-tilted-button" {...props}>
        <span>초대하기</span>
      </button>
    </div>
  );
};
export default Invite;
