import { render } from '@testing-library/react';
import { NavbarRow } from './NavbarRow';

describe('NavbarRow', () => {
  it('should render the navbar with the correct text', () => {
    const { container, getByText, getByRole } = render(<NavbarRow />);
    const navbarBrand = getByText('Shortcat');
    expect(navbarBrand).toBeInTheDocument();

    const addButton = getByRole('link', { name: 'Add a Shortcat' });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute('href', '/add');

    expect(container).toMatchSnapshot()
  });
});