import React from "react";
import Picker from "emoji-picker-react";
import { AiFillCloseCircle } from "react-icons/ai";

const EmojiPicker = React.forwardRef(
  ({ setShowEmojis, setDetails, fieldName }, ref) => {
    const onEmojiClick = (event, emojiObject) => {
      setDetails((state) => ({
        ...state,
        [fieldName]: state[fieldName] + emojiObject.emoji,
      }));
    };
    return (
      <div ref={ref} className="relative ">
        <Picker disableAutoFocus={true} onEmojiClick={onEmojiClick} />
        <button
          className="flex justify-center items-center w-4 h-4 rounded-full bg-cta-dark text-cta-light absolute -top-1 -right-1"
          type="button"
          onClick={() => setShowEmojis(false)}
        >
          <AiFillCloseCircle />
        </button>
      </div>
    );
  }
);

export default EmojiPicker;
