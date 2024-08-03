import React, { useState, useRef } from 'react';

const FloatingWindow = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({
      x: e.clientX - windowRef.current.offsetLeft,
      y: e.clientY - windowRef.current.offsetTop,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }

    if (isResizing) {
      setSize({
        width: e.clientX - windowRef.current.offsetLeft,
        height: e.clientY - windowRef.current.offsetTop,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div
      ref={windowRef}
      className="absolute bg-white border border-gray-300 rounded shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="cursor-move p-2 bg-gray-200"
        onMouseDown={handleMouseDown}
      >
        Floating Window
      </div>
      <div className="p-4">Your content goes here...</div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize"
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
};

export default FloatingWindow;
