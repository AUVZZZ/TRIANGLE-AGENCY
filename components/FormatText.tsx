
import React from 'react';

export const FormatText = ({ children }: { children: React.ReactNode }) => {
  if (typeof children !== 'string' && typeof children !== 'number') {
    return <>{children}</>;
  }

  const text = String(children);
  const parts = text.split(/(3)/g);

  return (
    <>
      {parts.map((part, i) => 
        part === '3' ? (
          <span key={i} className="text-red-600 font-black font-mono">3</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};
