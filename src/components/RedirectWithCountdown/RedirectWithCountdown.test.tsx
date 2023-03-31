import { RouterContext } from 'next/dist/shared/lib/router-context';
import { render, act } from '@testing-library/react';
import { RedirectWithCountdown, RedirectWithCountdownProps } from './RedirectWithCountdown';

const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
};

// const mockFetch = jest.fn().mockResolvedValue({});
// jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch());

const guid = "8210ac5810bb"
const redirectUrl = 'https://nam.az';

const renderRedirectWithCountdown = (props: RedirectWithCountdownProps) => {
  return render(
    <RouterContext.Provider value={{ ...mockRouter }}>
      <RedirectWithCountdown {...props} />
    </RouterContext.Provider>
  );
};

describe('RedirectWithCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]),
    }) as jest.Mock<Promise<Response>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();

    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should render a countdown and redirect after 5 seconds', () => {
    const { container } = renderRedirectWithCountdown({ redirectUrl, guid });
    expect(container).toMatchSnapshot()
  });

  it('should redirect immediately if countdown is set to 0', () => {
    const { queryByText } = renderRedirectWithCountdown({ redirectUrl, guid });
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockRouter.replace).toHaveBeenCalledWith(redirectUrl);

    expect(queryByText(`You will be redirected to ${redirectUrl} in 0 seconds.`)).not.toBeInTheDocument();
  });

  it('should redirect when the button is clicked', () => {
    const { getByRole } = renderRedirectWithCountdown({ redirectUrl, guid });

    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(mockRouter.push).toHaveBeenCalledWith(redirectUrl);
  });
});