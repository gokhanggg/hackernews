import axios from 'axios';
const BASEURL = 'https://hacker-news.firebaseio.com/v0'

export const getNTopStoryIds = async (limit = 10) => {
  const url = `${BASEURL}/topstories.json?limitToFirst=${limit}&orderBy="$key"`;
  return await axios.get(url);
};

export const getStoryDetail = async (storyId) => {
  const url = `${BASEURL}/item/${storyId}.json`;
  return await axios.get(url);
}

export const getAllStoryDetails = async (storyIds) => {
  return Promise.all(storyIds.map(async storyId => {
    const story = await getStoryDetail(storyId);
    return story.data;
  }));
}
