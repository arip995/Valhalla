export default function manifest() {
  return {
    name: 'Nexify',
    short_name: 'Nexify',
    description:
      'Nexify is loved by the best creators around the world',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#8F00FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
