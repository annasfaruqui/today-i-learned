function VoteButton({ value, emoji, onClick, disabled, isLoading }) {
  return (
    <button
      className="flex items-center gap-3 rounded-full bg-definedColor-base3 px-4 py-1 text-lg transition-all hover:bg-definedColor-base-hover disabled:cursor-not-allowed disabled:opacity-80"
      onClick={onClick}
      disabled={disabled}
    >
      <span>{emoji}</span>
      <span className="inline-flex min-w-[1.25rem] items-center justify-center font-extrabold">
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-definedColor-base2 border-t-definedColor-text-base" />
        ) : (
          value
        )}
      </span>
    </button>
  );
}

export default VoteButton;
