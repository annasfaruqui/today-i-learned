function VoteButton({ value, emoji, onClick, disabled, isLoading }) {
  return (
    <button
      className="flex items-center gap-3 rounded-full bg-definedColor-base3 px-4 py-1 text-lg transition-all hover:bg-definedColor-base-hover disabled:opacity-80"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{emoji}</span>
      {isLoading ? (
        <span className="border-definedColor-base2 border-t-definedColor-text-base h-4 w-4 animate-spin rounded-full border-[3px] border-solid px-4 "></span>
      ) : (
        <span className="font-extrabold">{value}</span>
      )}
    </button>
  );
}

export default VoteButton;
