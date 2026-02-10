const Badge = ({ text, color, rotate, position, style: extraStyle }) => {
  const style = {
    backgroundColor: `var(${color})`,
    color: "#ffffff",
    transform: `rotate(${rotate}deg)`,
    position: "absolute",
    ...position,

    padding: "8px 25px",
    borderRadius: "30px",
    fontSize: "18px",

    ...extraStyle,
  };

  return (
    <span className="badge" style={style}>
      {text}
    </span>
  );
};

export default Badge;
