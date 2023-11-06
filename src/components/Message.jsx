function Message({ message, uppercase = false }) {
  return (
    <div className="mt-4 flex h-[28rem] items-center justify-center">
      <p
        className={`${
          uppercase && "uppercase"
        } mx-8 text-center text-4xl text-definedColor-faded`}
      >
        {message}
      </p>
    </div>
  );
}

export default Message;
