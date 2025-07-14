"use client";
import { useAuth } from "@/features/auth/useAuth";
import React from "react";

const ProtectedRotues = ({ children }: { children: React.ReactNode }) => {
  const {  loading } = useAuth();
  if (loading) return <div>loading</div>;
  return <div>{children}</div>;
};

export default ProtectedRotues;
