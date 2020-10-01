import React, { FC } from 'react';

type ComponentOneProps = {
  text: string;
  onClick?: () => void;
};

export const ComponentOne: FC<ComponentOneProps> = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      <h1>{text}</h1>
    </button>
  );
};
