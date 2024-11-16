import { usePathname, useRouter } from 'next/navigation';

export const useRedirectAfterPurchased = () => {
  const router = useRouter();
  const pathname = usePathname();

  const redirectAfterPurchased = () => {
    const [product, productId] = pathname
      .split('/')
      .slice(1, 3); // Extract product and productId
    const host = process.env.NEXT_PUBLIC_HOST;
    const url = `${host}/consume/${product}/${productId}`;
    router.push(url);
  };

  return redirectAfterPurchased;
};
