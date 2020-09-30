// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent, screen } from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import { List } from './List';
import { IItem } from './Item';

import itemsData from '../../enum/items.json';

const items = itemsData as IItem[];
const getItems = (filter: string) =>
  items.filter((item: IItem) => item.texts.full_title.toUpperCase().includes(filter));
const SearchService = {
  getItemsBySearchIndex: (flt: string) => Promise.resolve(getItems(flt)),
};

const filter = 'МОЛО';
const selectedItemIndex = 0;
const filteredItems = getItems(filter);
const onSelect = jest.fn();

test('loads and displays filtered items', async () => {
  render(<List filter={filter} onSelect={onSelect} searchService={SearchService} />);
  expect((await screen.findAllByText(RegExp(filter, 'i'))).length).toEqual(filteredItems.length);
});

test('call onSelect by click on item', async () => {
  render(<List filter={filter} onSelect={onSelect} searchService={SearchService} />);
  fireEvent.click((await screen.findAllByText(RegExp(filter, 'i')))[selectedItemIndex]);
  expect(onSelect).toBeCalledWith(filteredItems[selectedItemIndex]);
});
