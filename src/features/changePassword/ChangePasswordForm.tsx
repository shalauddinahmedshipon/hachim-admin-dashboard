// components/ChangePasswordForm.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";

// 🛡️ Zod Schema
const schema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof schema>;

export default function ChangePasswordForm() {
  const { changePassword, error } = useAuthStore();
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setSuccessMsg("");
    const success = await changePassword(
      data.oldPassword,
      data.newPassword,
      data.confirmPassword
    );
    if (success) {
      setSuccessMsg("Password changed successfully!");
      reset();
    }
  };

  return (
    <Card className="max-w-md min-w-xs mx-auto mt-24 py-10">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="oldPassword" className="mb-2">Old Password</Label>
            <Input type="password" {...register("oldPassword")} />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="newPassword" className="mb-2">New Password</Label>
            <Input type="password" {...register("newPassword")} />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="mb-2">Confirm New Password</Label>
            <Input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Change Password"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
