function VoteButton({ value, emoji, onClick, disabled }) {
  return (
    <button
      className="flex items-center gap-3 rounded-full bg-definedColor-base3 px-4 py-1 text-lg transition-all hover:bg-definedColor-base-hover disabled:bg-definedColor-base2"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{emoji}</span>
      <span className="font-extrabold">{value}</span>
    </button>
  );
}

export default VoteButton;
