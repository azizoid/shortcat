import { fetcher } from '@/utilities/fetcher';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr'

type RedirectWithCountdownProps = {
  redirectUrl: string
  guid: string
}

export const RedirectWithCountdown = ({ redirectUrl, guid }: RedirectWithCountdownProps) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const { data: reportData } = useSWR<{ visit_count: number }>(guid ? `/api/v1/codes/${guid}/report` : null, fetcher)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
    }, 5000);

    return () => clearInterval(countdownInterval);
  }, [redirectUrl]);

  useEffect(() => {
    // record the data only when user followed the link
    if (countdown === 0) {
      try {
        fetch(`/api/v1/codes/${guid}/report`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (error) {
        // TODO: display errors in some toaster component 
        console.error(error);
      }

      router.replace(redirectUrl);
    }
  }, [countdown, guid, redirectUrl, router]);

  if (countdown === 0) {
    return null;
  }

  return (
    <div className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white">
      <p>You will be redirected to {redirectUrl} in {countdown} seconds.</p>

      <p>This URL was visiter {reportData?.visit_count ?? 0} times</p>

      <button onClick={() => router.push(redirectUrl)}>Click here if you are not automatically redirected.</button>
    </div>
  );
}