import React, { useState } from 'react';

import GiftPic from '../assets/images/gift.png';

function Gift({ name }) {
  const [showGift, setShowGift] = useState(false);
  const handleShowGift = () => {
    setShowGift(true);
  };
  return (
    <div>
      {!showGift && (
        <img
          onClick={handleShowGift}
          src={GiftPic.src}
          alt="gift"
          className="hover:scale-150 duration-150 cursor-pointer"
        />
      )}
      {showGift && <span className="w-20 h-20">{name}</span>}
    </div>
  );
}

export default Gift;
