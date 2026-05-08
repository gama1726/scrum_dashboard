"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/ui-store";

export default function HomePage() {
  const router = useRouter();
  const startPage = useUiStore((state) => state.startPage);

  useEffect(() => {
    router.replace(startPage);
  }, [router, startPage]);

  return null;
}
