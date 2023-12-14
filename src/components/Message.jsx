function Message({ message, uppercase = false }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p
        className={`${
          uppercase && "uppercase"
        } mx-8 mb-8 text-center text-4xl text-definedColor-faded`}
      >
        {message}
      </p>
    </div>
  );
}

export default Message;
