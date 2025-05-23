import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/apartments');
  }, [router]);

  return <p>Redirecting to /apartments...</p>;
}
