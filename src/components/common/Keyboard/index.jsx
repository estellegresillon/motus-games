const Keyboard = ({ assignColors, keyCollections, onChange }) => (
  <div className="keyboard-container">
    {keyCollections.map((collection) => (
      <div className="board-line" key={collection}>
        {collection.map((k) => (
          <div
            className={`${assignColors(k)} board-box is-clickable`}
            key={k}
            onClick={() => onChange(k)}
          >
            {k}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;
