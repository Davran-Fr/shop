import React from "react";
import NotificateInfo from "@/components/notification/Notification";

import { Tables } from "@/components/cards/Tables";
import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";

const page = () => {

  return (
    <div className="font-medium">
      <NotificateInfo />
      <BreadCrumbs name="cards"/>
      <Tables />
    </div>
  );
};

export default page;
