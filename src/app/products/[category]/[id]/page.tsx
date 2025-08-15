"use client";

import React from "react";
import NotificateInfo from "@/components/notification/Notification";
import QrCode from "@/components/infoProduct/QrCode";
import Info from "@/components/infoProduct/Info";
import { dates } from "@/components/infoProduct/dates";
import { LinksInfo } from "@/components/infoProduct/LinksInfo";

const page = () => {
  const { isLoading, error, infoBase } = dates();
  if (isLoading) return;
  if (error || !infoBase) return null;
  return (
    <div className="w-full py-20 ">
      <QrCode />
      <NotificateInfo />
      <LinksInfo />
      <Info />
    </div>
  );
};

export default page;
