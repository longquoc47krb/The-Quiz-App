/* eslint-disable prettier/prettier */
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const [dataFromLocalStorage, setDataFromLocalStorage] = useState('');
  // true: dark; false: light
  const [toggle, setToggle] = useState(dataFromLocalStorage === 'dark')
  useEffect(()=>{
      setTheme('dark')
  },[])
  return (
    <label className="ui-switch mr-4">
      <input
        ref={checkBoxRef}
        type="checkbox"
        checked={toggle}
        onClick={() => setToggle(!toggle)}
      />
      <div className="slider">
        <div className="circle" />
      </div>
    </label>
  );
}

export default DarkModeSwitch;
