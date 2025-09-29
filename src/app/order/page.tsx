import React from "react";

import { BreadCrumbs } from "@/components/infoProduct/BreadCrumbs";
import { Address } from "@/components/order/Address";
import { Order } from "@/components/order/Order";

const page = () => {
  return (
    <div>
      <BreadCrumbs />
      <Order />
      <Address />
    </div>
  );
};

export default page;
