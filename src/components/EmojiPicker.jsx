import React from "react";
import Picker from "emoji-picker-react";

const EmojiPicker = React.forwardRef(
  ({ setShowEmojis, setDetails, fieldName }, ref) => {
    const onEmojiClick = (event, emojiObject) => {
      setDetails((state) => ({
        ...state,
        [fieldName]: state[fieldName] + emojiObject.emoji,
      }));
    };
    return (
      <div
        ref={ref}
        className=" flex justify-start items-start flex-col absolute bottom-[-5rem] left-full md:left-[10rem] "
      >
        <button
          type="button"
          className="ml-auto"
          onClick={() => setShowEmojis(false)}
        >
          x
        </button>
        <Picker disableAutoFocus={true} onEmojiClick={onEmojiClick} />
      </div>
    );
  }
);

export default EmojiPicker;
