import React, { ReactElement, useState, Dispatch, SetStateAction } from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';

export interface IInputService {
  setActive: (setValue: Dispatch<SetStateAction<string>>) => void;
  unsetActive: (setValue: Dispatch<SetStateAction<string>>) => void;
}

export function InputService(props: {
  children: React.FunctionComponent<{ inputService: IInputService }>;
}): ReactElement {
  const [service] = useState(ActiveInputService);
  const { children: Input } = props;
  return React.createElement(Input, { ...props, inputService: service }, []);
}
