import { render, screen } from '@testing-library/svelte';
import App from '$lib/App.svelte'; // Adjust the import path according to your project structure

describe('App', () => {
  test('renders correctly', () => {
    render(App);

    expect(screen.getByText('Show Mode')).toBeInTheDocument();
    expect(screen.getByText('Projector')).toBeInTheDocument();
    expect(screen.getByText('House Lights')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
    expect(screen.getByText('More Lx')).toBeInTheDocument();
  });

  // Add more tests as needed
});
