import React from "react";

import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";
import { Address } from "@/components/order/Address";
import { Order } from "@/components/order/Order";

const page = () => {
  return (
    <div>
      <BreadCrumbs />
      <Address />
      <Order />
    </div>
  );
};

export default page;
