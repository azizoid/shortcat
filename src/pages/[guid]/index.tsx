import { Shortcat } from "@prisma/client";
import { useRouter } from "next/router"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GuidPage = () => {
  const router = useRouter()
  const { guid } = router.query

  const { data, error } = useSWR<Shortcat>(guid ? `/api/v1/codes/${guid}` : null, fetcher)

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  return <>
    <div>GUID: {data.shortcode_guid}</div>
    <div>Redirect Url: {data.redirect_url}</div>
    <div>Active: {data.active}</div>
  </>
}

export default GuidPage