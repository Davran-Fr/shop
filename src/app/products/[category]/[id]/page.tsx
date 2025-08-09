"use client";
import React from "react";
import { LinksInfo } from "@/components/infoProduct/LinksInfo";
import NotificateInfo from "@/components/notification/Notification";
import ImagesTexts from "@/components/infoProduct/ImagesTexts";
import QrCode from "@/components/infoProduct/QrCode";
import { dates } from "@/components/infoProduct/dates";
import NotFoundInfo from "@/components/infoProduct/ui/NotFoundInfo";

const page = () => {
  const { isLoading, error, infoBase } = dates();
  if (isLoading) return ;
  if (error || !infoBase) return <NotFoundInfo />;
  return (
    <div className="w-full py-20 ">
      <QrCode />
      <NotificateInfo />
      <LinksInfo />
      <ImagesTexts />
    </div>
  );
};

export default page;
