import { convertStoriesToChartData } from '../../utils';

it('should convert given stories which has descendants and score props to chart data', () => {
  const stories = [
    {
      descendants: 1,
      score: 2
    },
    {
      descendants: 3,
      score: 4
    },
    {
      descendants: 5,
      score: 6
    },
    {
      descendants: 7,
      score: 8
    },
  ];

  const expectedConverted = {
    labels: [
      1, 3, 5, 7
    ],
    data: [
      2, 4, 6, 8
    ]
  }

  const convertedData = convertStoriesToChartData(stories);
  expect(convertedData).toEqual(expectedConverted);
})