'use client'

import { useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { createPaymentOrder, verifyPayment } from "@/services/paymentService";


function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { contentId } = useParams();
  const contentType = searchParams.get("type") || "movie";
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const title = useMemo(
    () => (contentType === "tv" ? "Unlock series access" : "Unlock movie access"),
    [contentType]
  );

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-36 text-white md:px-10">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-sm uppercase tracking-[0.45em] text-amber-300/80">Payment</p>
          <h1 className="mt-4 text-4xl font-semibold">{title}</h1>
          <p className="mt-4 text-neutral-400">
            This page uses your backend Razorpay order and verification APIs. Once payment succeeds, the rental becomes active for 48 hours.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Backend flow</p>
            <p className="mt-3 text-sm text-neutral-300">
              Create order, complete Razorpay checkout, verify signature, create rental, and redirect to the viewing flow.
            </p>
          </div>

          {error && <p className="mt-6 text-sm text-rose-300">{error}</p>}

          <button
            type="button"
            disabled={status === "loading"}
            onClick={async () => {
              try {
                setError("");
                setStatus("loading");

                const scriptReady = await loadRazorpayScript();
                if (!scriptReady) {
                  throw new Error("Unable to load Razorpay checkout");
                }

                const response = await createPaymentOrder(contentId);
                const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

                if (!key) {
                  throw new Error("NEXT_PUBLIC_RAZORPAY_KEY_ID is missing");
                }

                const razorpay = new window.Razorpay({
                  key,
                  amount: response.order.amount,
                  currency: response.order.currency,
                  name: "StreamForge",
                  description: "OTT rental payment",
                  order_id: response.order.id,
                  handler: async (paymentResult) => {
                    await verifyPayment({
                      ...paymentResult,
                      paymentId: response.paymentId
                    });

                    router.push(
                      contentType === "tv" ? `/tvshow/${contentId}` : `/watch/movie/${contentId}`
                    );
                  },
                  theme: {
                    color: "#fbbf24"
                  }
                });

                razorpay.on("payment.failed", () => {
                  setError("Payment failed. Please try again.");
                  setStatus("idle");
                });

                razorpay.open();
                setStatus("idle");
              } catch (paymentError) {
                setError(paymentError.message || "Payment could not be started");
                setStatus("idle");
              }
            }}
            className="mt-8 w-full rounded-full bg-amber-300 px-5 py-3 font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Preparing checkout..." : "Pay with Razorpay"}
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}
