import { useRouter } from "next/router"
import useSWR from 'swr'

import { Shortcat } from "@prisma/client";
import { fetcher } from "@/utilities/fetcher";
import { ErrorMessage, Loading, RedirectWithCountdown } from "@/components";

const GuidPage = () => {
  const router = useRouter()
  const { guid } = router.query

  const { data, error } = useSWR<Shortcat>(guid ? `/api/v1/codes/${guid}` : null, fetcher)
  const { data: reportData } = useSWR<{ visit_count: number }>(guid ? `/api/v1/codes/${guid}/report` : null, fetcher)

  if (error) return <ErrorMessage />
  if (!data) return <Loading />

  if (data.active) {
    return <RedirectWithCountdown redirectUrl={data.redirect_url} guid={data.shortcode_guid} visitCount={reportData?.visit_count} />
  }

  return <p className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white">You could be redirected to <u>{data.redirect_url}</u> but this link is disabled.</p>
}

export default GuidPage