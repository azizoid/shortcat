import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type RedirectWithCountdownProps = {
  redirectUrl: string
}

export const RedirectWithCountdown = ({ redirectUrl }: RedirectWithCountdownProps) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

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
    if (countdown === 0) {
      router.replace(redirectUrl);
    }
  }, [countdown, redirectUrl, router]);

  if (countdown === 0) {
    return null;
  }

  return (
    <div className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white">
      <p>You will be redirected to {redirectUrl} in {countdown} seconds.</p>
      <button onClick={() => router.push(redirectUrl)}>Click here if you are not automatically redirected.</button>
    </div>
  );
}