// code by peter.bartos, https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
export const getHighlightedText = (text, highlight) => {
  // rip typing
  if (text === null) {
    return;
  }
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "#FFFF00" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};
