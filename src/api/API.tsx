import { Candidate } from '../interfaces/Candidate.interface';

const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // Fetch additional details for each user
    const detailedData = await Promise.all(
      data.map(async (user: Candidate) => {
        const userDetails = await fetch(user.url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        return await userDetails.json();
      })
    );
    return detailedData;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export { searchGithub };