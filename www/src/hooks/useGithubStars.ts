import { useEffect } from 'react';

// @ts-ignore
const kFormatter = (num) => `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`;

interface GithubApiRepoResponse {
  stargazers_count: number;
}

export const useGithubStars = () => {
  useEffect(() => {
    fetch('https://api.github.com/repos/Jozwiaczek/smart-gate')
      .then((res) => res.json())
      .then((data: GithubApiRepoResponse) => {
        const navLinks = document.getElementsByClassName('navbar__item navbar__link');
        const githubStat = document.createElement('span');
        githubStat.innerHTML =
          data.stargazers_count < 1000
            ? data.stargazers_count.toString()
            : kFormatter(data.stargazers_count);
        githubStat.className = 'github-counter';
        navLinks[1].appendChild(githubStat);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []);
};
