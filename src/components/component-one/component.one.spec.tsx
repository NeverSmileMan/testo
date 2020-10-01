import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentOne } from './component.one';

test('Should render expected text inside', () => {
  const textMessage = 'TestMessage';
  render(<ComponentOne text={textMessage} />);
  expect(screen.queryByText(textMessage)?.textContent).toEqual(textMessage);
});
