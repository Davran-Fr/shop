"use client";

import React from "react";
import NotificateInfo from "@/components/notification/Notification";
import QrCode from "@/components/infoProduct/QrCode";
import Info from "@/components/infoProduct/Info";

import { dates } from "@/components/infoProduct/dates";
import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";
import { ReviewsRecommends } from "@/components/infoProduct/Reviews-Recommends";

const page = () => {
  const { error, infoBase } = dates();

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
