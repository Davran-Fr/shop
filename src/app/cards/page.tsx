''
import NotificateInfo from "@/components/notification/Notification";
import { Tables } from "@/components/cards/Tables";
import React from "react";
import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";

const page = () => {

  return (
    <div className="">
      <NotificateInfo />
      <BreadCrumbs name="cards"/>
      <Tables />
    </div>
  );
};

export default page;
