import React from 'react';

const emojiList = ['👍', '❤️', '😂', '🔥', '💡'];

const EmojiReactionsBar = ({ onReact }) => {
  return (
    <div className="flex gap-2 p-2 text-lg">
      {emojiList.map((emoji, i) => (
        <button
          key={i}
          onClick={() => onReact(emoji)}
          className="hover:scale-110 transition-transform"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiReactionsBar;
