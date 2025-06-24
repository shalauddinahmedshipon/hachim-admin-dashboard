// features/subscription/SubscriptionForm.tsx
import { useState } from 'react';

export function SubscriptionForm({ onSubmit }: { onSubmit: (data: { amount: number; durationDays: number }) => void }) {
  const [amount, setAmount] = useState('');
  const [durationDays, setDurationDays] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ amount: parseFloat(amount), durationDays: parseInt(durationDays) });
      }}
      className="space-y-4"
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="border w-full p-2 rounded"
      />
      <input
        type="number"
        value={durationDays}
        onChange={(e) => setDurationDays(e.target.value)}
        placeholder="Duration Days"
        required
        className="border w-full p-2 rounded"
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded">Create</button>
    </form>
  );
}
