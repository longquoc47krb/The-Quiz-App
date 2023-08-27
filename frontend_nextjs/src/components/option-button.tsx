import React from 'react';

function OptionButton({
  handleAnswer,
  handleAddYourAnswer,
  validateClassName,
  option,
  disabled,
  children,
  key,
}) {
  return (
    <button
      key={key}
      disabled={disabled}
      value={option}
      className={`option ${validateClassName(option, key)}`}
      onClick={(e) => {
        handleAnswer(e, key);
        handleAddYourAnswer(e);
      }}
    >
      {children}
    </button>
  );
}

export default OptionButton;
