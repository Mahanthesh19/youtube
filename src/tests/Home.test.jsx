import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';

const mockVideos = [
  {
    id: { videoId: '123' },
    snippet: {
      title: 'Test Video',
      channelTitle: 'Test Channel',
      thumbnails: { medium: { url: 'https://via.placeholder.com/150' } },
    },
  },
];

test('renders videos on the home page', () => {
  render(
    <BrowserRouter>
      <Home videos={mockVideos} />
    </BrowserRouter>
  );

  expect(screen.getByText(/Test Video/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Channel/i)).toBeInTheDocument();
});
