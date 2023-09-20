import { useTheme } from 'next-themes';
import React from 'react';
import { PiMoonFill, PiSunBold } from 'react-icons/pi';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="cursor-pointer">
      {theme === 'dark' ? (
        <PiMoonFill onClick={() => setTheme('light')} />
      ) : (
        <PiSunBold onClick={() => setTheme('dark')} />
      )}
    </div>
  );
}
