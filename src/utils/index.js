export const convertStoriesToChartData = (stories) => {
  const chartData = stories.reduce((acc, story) => {
    if (!story.descendants || !story.score) return acc;
    acc.labels.push(story.descendants);
    acc.data.push(story.score);
    return acc;
  }, { labels: [], data: [] });
  return chartData;
};