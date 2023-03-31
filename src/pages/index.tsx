
import Head from 'next/head'
import useSWR from 'swr'
import { fetcher } from '@/utilities/fetcher';
import { Shortcat } from '@prisma/client';
import { ShortcatsTable } from '@/components/ShortcatsTable/ShortcatsTable';
import { Loading } from '@/components/Loading/Loading';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

const Home = () => {
  const { data, error } = useSWR<Shortcat[]>("/api/v1/codes", fetcher)

  if (error) return <ErrorMessage />
  if (!data) return <Loading />

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