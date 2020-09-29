import React from 'react';
import { useStyles } from './modal.window.style';

interface Prop {
  content: JSX.Element | null;
}
export const ModalWindow = ({ content }: Prop) => {
  const cls = useStyles();
  return content && (
    <div className={cls.back}>
      { content}
    </div>
  )
}
