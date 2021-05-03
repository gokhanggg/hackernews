import React from 'react';
import axios from 'axios';
import "regenerator-runtime/runtime.js";
import mockAdapter from 'axios-mock-adapter';
import { render, fireEvent } from '@testing-library/react';
import { storyIds, storyDetail1, storyDetail2, storyDetail3 } from '../../dummyData/index.js';
import App from '../../containers/app';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=3&orderBy="$key"';
const storyUrlGenerator = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const mock = new mockAdapter(axios);
mock.onGet(
  topStoriesUrl,
).reply(200, storyIds);

mock.onGet(
  storyUrlGenerator('27029196')
).reply(200, storyDetail1);

mock.onGet(
  storyUrlGenerator('27029191')
).reply(200, storyDetail2);

mock.onGet(
  storyUrlGenerator('27025829')
).reply(200, storyDetail3);


it('App should render propertly with values, unfortunately can not test canvas in testing environment', async () => {
  const { getByText, findByText, getByTestId } = render(<App defaultQuerylimit={3} />);
  await findByText('Get Data')
  getByText('Descendants/Score chart');
  const numberInput = getByTestId('numberInput');
  expect(numberInput.value).toBe('3');
});

it('should write warning message on empty string as inputValue and disappear on correct input', async () => {
  const { getByText, findByText, getByTestId, queryByText } = render(<App defaultQuerylimit={3} />);
  const button = await findByText('Get Data')
  const numberInput = getByTestId('numberInput');

  fireEvent.change(numberInput, { target: { value: '' } });
  fireEvent.click(button);
  getByText('Your input value is not a number. Please enter a number as input value.');

  fireEvent.change(numberInput, { target: { value: 3 } });
  fireEvent.click(button);

  getByText('Loading...');
  await findByText('Get Data')
  expect(
    queryByText('Your input value is not a number. Please enter a number as input value.')
  ).toBeNull();
});

it('should show 400 error on screen', async () => {
  mock.onGet(
    topStoriesUrl,
  ).reply(400);

  const { findByText } = render(<App defaultQuerylimit={3} />);
  await findByText('Request failed with status code 400');

  mock.onGet(
    topStoriesUrl,
  ).reply(404);
});

it('should show 404 error on screen', async () => {
  mock.onGet(
    topStoriesUrl,
  ).reply(404);

  const { findByText } = render(<App defaultQuerylimit={3} />);
  await findByText('Request failed with status code 404');
});