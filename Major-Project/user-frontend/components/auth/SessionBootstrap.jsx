'use client'

import { useEffect, useRef } from "react";
import { fetchCurrentUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function SessionBootstrap() {
  const dispatch = useAppDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return null;
}
