module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { redirects } = netlifyConfig;

    const { REACT_APP_API_URL } = process.env;

    redirects.push({
      from: '/api/*',
      to: `${REACT_APP_API_URL}/:splat`,
      status: 200,
    });
  },
};
