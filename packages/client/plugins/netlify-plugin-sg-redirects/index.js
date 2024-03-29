module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { redirects } = netlifyConfig;

    const { REACT_APP_API_URL } = process.env;

    // IMPORTANT
    // Order of redirects matters
    redirects.push({
      from: '/api/*',
      to: `${REACT_APP_API_URL}/:splat`,
      status: 200,
    });

    redirects.push({
      from: '/*',
      to: '/index.html',
      status: 200,
    });
  },
};
