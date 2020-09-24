// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent, wait, screen } from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import List from './List';

import items from '../../data/items.json';

const filter = 'МОЛО';
const filteredItems = items.filter(item => item.texts.full_title.toUpperCase().includes(filter));
const selectedItemIndex = 0;
const onSelect = jest.fn();

test('loads and displays filtered items', async () => {
    const { container } = render(<List filter={filter} onSelect={onSelect} />);
    expect((await screen.findAllByText(RegExp(filter, 'i'))).length)
        .toEqual(filteredItems.length);
});

test('call onSelect by click on item', async () => {
    render(<List filter={filter} onSelect={onSelect} />);
    fireEvent.click((await screen.findAllByText(RegExp(filter, 'i')))[selectedItemIndex]);
    expect(onSelect).toBeCalledWith(filteredItems[selectedItemIndex]);
});

