
module.exports = {
  async headers() {
    return [
      {
        source: '/api/image/:playerID',
        headers: [
          { key: 'Content-Type', value: 'image/png' },
          { key: 'Cache-Control', value: 'public, max-age=604800' },
        ],
      },
    ];
  },
};