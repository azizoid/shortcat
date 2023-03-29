import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, act } from '@testing-library/react';
import { RedirectWithCountdown } from './RedirectWithCountdown';

const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
};

const renderRedirectWithCountdown = (redirectUrl: string) => {
  return render(
    <RouterContext.Provider value={{ ...mockRouter }}>
      <RedirectWithCountdown redirectUrl={redirectUrl} />
    </RouterContext.Provider>
  );
};

describe('RedirectWithCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render a countdown and redirect after 5 seconds', () => {
    const redirectUrl = 'https://nam.az';
    const { container } = renderRedirectWithCountdown(redirectUrl);
    expect(container).toMatchSnapshot()
  });

  it('should redirect immediately if countdown is set to 0', () => {
    const redirectUrl = 'https://nam.az';
    const { queryByText } = renderRedirectWithCountdown(redirectUrl);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockRouter.replace).toHaveBeenCalledWith(redirectUrl);

    expect(queryByText(`You will be redirected to ${redirectUrl} in 0 seconds.`)).not.toBeInTheDocument();
  });

  it('should redirect when the button is clicked', () => {
    const redirectUrl = 'https://nam.az';
    const { getByRole } = renderRedirectWithCountdown(redirectUrl);

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(mockRouter.push).toHaveBeenCalledWith(redirectUrl);
  });
});