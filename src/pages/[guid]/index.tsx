import { useRouter } from "next/router"
import useSWR from 'swr'

import { Shortcat } from "@prisma/client";
import { fetcher } from "@/utilities/fetcher";
import { RedirectWithCountdown } from "@/components/RedirectWithCountdown/RedirectWithCountdown";

const GuidPage = () => {
  const router = useRouter()
  const { guid } = router.query

  const { data, error } = useSWR<Shortcat>(guid ? `/api/v1/codes/${guid}` : null, fetcher)

  if (error || !data) {
    return <div>Loading...</div>;
  }

  if (data.active) {
    return <RedirectWithCountdown redirectUrl={data.redirect_url} />
  }

  return <p className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white">You could be redirected to <u>{data.redirect_url}</u> but this link is disabled.</p>
}

export default GuidPage