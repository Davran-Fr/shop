"use client";

import React from "react";
import NotificateInfo from "@/components/notification/Notification";
import Info from "@/components/infoProduct/Info";
import QrCode from "@/components/infoProduct/QrCode";

import { dates } from "@/components/infoProduct/dates";
import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";
import { ReviewsRecommends } from "@/components/infoProduct/Reviews-Recommends";
import { Loading } from "@/ui/Loading";

const page = () => {
  const { error, infoBase, isLoading } = dates();
  if (isLoading) return <Loading />;
  if (error || !infoBase) return null;

  return (
    <div>
      <QrCode />
      <NotificateInfo />
      <BreadCrumbs name="produts" />
      <Info />
      <ReviewsRecommends />
    </div>
  );
};

export default page;
