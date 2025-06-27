// components/MainLoading.tsx
import { Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useVideoStore } from '@/store/videoStore'; // add any other store that fetches
import { useQuoteStore } from '@/store/quoteStore';
import { useArticleStore } from '@/store/articleStore';
import { usePaymentStore } from '@/store/paymentStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';

export const MainLoading = () => {
  const userLoading = useUserStore((s) => s.loading);
  const videoLoading = useVideoStore((s) => s.loading);
  const qouteLoading = useQuoteStore((s) => s.loading);
  const articleLoading = useArticleStore((s) => s.loading);
  const paymentLoading = usePaymentStore((s) => s.loading);
  const subscriptionLoading = useSubscriptionStore((s) => s.loading);


  const isLoading = userLoading || videoLoading || qouteLoading || articleLoading || paymentLoading|| subscriptionLoading;

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center w-full h-full py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};
