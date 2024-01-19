import { render } from '@/test-utils';
import App from '../App';

describe('App.tsx', () => {
  it('should render without error', async () => {
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});
