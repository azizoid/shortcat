import { render } from '@testing-library/react'
import { Shortcat } from '@prisma/client'
import { ShortcatsTable } from './ShortcatsTable'

const mockShortcats: Shortcat[] = [
  {
    id: 1,
    shortcode_guid: 'ABC123',
    redirect_url: 'https://mojkuran.com',
    active: true,
  },
  {
    id: 2,
    shortcode_guid: 'DEF456',
    redirect_url: 'https://quran.az',
    active: false,
  },
]

describe('ShortcatsTable', () => {
  it('should render a table with the correct headings', () => {
    const { container, getByText } = render(<ShortcatsTable data={[]} />)

    expect(getByText('GUID')).toBeInTheDocument()
    expect(getByText('Redirect Url')).toBeInTheDocument()
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('View')).toBeInTheDocument()
    expect(getByText('Edit')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should render a message when there is no data', () => {
    const { getByText } = render(<ShortcatsTable data={[]} />)

    expect(getByText('Your list is empty. Click the button on the top to add a Shortcat.')).toBeInTheDocument()
  })

  it('should render a table with the provided data', () => {
    const { container, getByText } = render(<ShortcatsTable data={mockShortcats} />)

    expect(getByText('ABC123')).toBeInTheDocument()
    expect(getByText('https://mojkuran.com')).toBeInTheDocument()
    expect(getByText('Active')).toBeInTheDocument()

    expect(getByText('DEF456')).toBeInTheDocument()
    expect(getByText('https://quran.az')).toBeInTheDocument()
    expect(getByText('Inactive')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})