
import Head from 'next/head'
import useSWR from 'swr'
import { fetcher } from '@/utilities/fetcher';
import { Shortcat } from '@prisma/client';
import { ShortcatsTable } from '@/components/ShortcatsTable/ShortcatsTable';

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
        <ShortcatsTable data={data} />
      </main>
    </>
  )
}

export default Home