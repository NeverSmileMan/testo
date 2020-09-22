import React, { createContext, Dispatch, FC, SetStateAction, useState, useMemo, useCallback } from 'react';
import ModalWindow from './functional-buttons/modal.wind/modal.wind'

interface ContextProp {
  modalContent: JSX.Element | null,
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>
}
const context: ContextProp = {
  modalContent: <></>,
  setModalContent: () => { }
}
export const ModalContext = createContext(context);

export const ModalWindowProvider: FC<{}> = ({ children }) => {
  const [modalContent, setModalContent] = useState(null as JSX.Element | null);
  const child = useMemo(() => children, [children])
  
  return (
    <ModalContext.Provider value={{modalContent, setModalContent}} >
      {child}
      <ModalWindow content={modalContent} />
    </ ModalContext.Provider>
  )
}