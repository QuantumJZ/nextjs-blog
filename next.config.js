
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://stats.nba.com/api/:path*', // Add `/api` to the destination URL
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/playerImage/:playerID',
        headers: [
          { key: 'Content-Type', value: 'image/png' },
          { key: 'Cache-Control', value: 'public, max-age=604800' },
        ],
      },
    ];
  },
};