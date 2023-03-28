
import Head from 'next/head'
import useSWR from 'swr'
import { Table } from 'flowbite-react'
import { fetcher } from '@/utilities/fetcher';
import { Shortcat } from '@prisma/client';
import Link from 'next/link';

const Home = () => {
  const { data, error } = useSWR<Shortcat[]>("/api/v1/codes", fetcher)

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Welcome Page</title>
      </Head>
      <main>
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>
              GUID
            </Table.HeadCell>
            <Table.HeadCell>
              Redirect Url
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Edit
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map(shortcat =>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={shortcat.id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {shortcat.shortcode_guid}
                </Table.Cell>
                <Table.Cell>
                  {shortcat.redirect_url}
                </Table.Cell>
                <Table.Cell>
                  {shortcat.active ? 'Active' : 'Inactive'}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/${shortcat.shortcode_guid}`} >
                    Edit
                  </Link>
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </main>
    </>
  )
}

export default Home