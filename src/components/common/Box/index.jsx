const Box = ({ classes, text }) => (
  <div className={classes}>
    <div className="content">
      <div className="front">{text}</div>
      <div className="back">{text}</div>
    </div>
  </div>
);

export default Box;
