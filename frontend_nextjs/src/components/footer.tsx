// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      {/* Add footer content, e.g., copyright info */}
      <p className="text-gray-400 text-center">
        &copy; {new Date().getFullYear()} My Quiz App
      </p>
    </footer>
  );
};

export default Footer;
