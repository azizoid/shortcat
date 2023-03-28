import { useRouter } from "next/router"
import useSWR from 'swr'

import { Shortcat } from "@prisma/client";
import { fetcher } from "@/utilities/fetcher";

const GuidPage = () => {
  const router = useRouter()
  const { guid } = router.query

  const { data, error } = useSWR<Shortcat>(guid ? `/api/v1/codes/${guid}` : null, fetcher)

  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;

  return router.push(data.redirect_url)
}

export default GuidPage