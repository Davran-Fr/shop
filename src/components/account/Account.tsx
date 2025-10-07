"use client";

import React from "react";

import { ChangeAccountNotificate } from "../notification/ChangeNotificate";
import { useProfileUpdate } from "@/features/profile-update/useProfileUpdate";
import { ProfileForm } from "./ProfileForm";
import { ProfileInfo } from "./ProfileInfo";

export const Account = () => {
  const { show, notificate, setShow, setNotificate } = useProfileUpdate();

  return (
    <div className="mx-auto font-medium text-xl">
      <ChangeAccountNotificate
        notificate={notificate}
        setShow={setShow}
        setNotificate={setNotificate}
      />
      <ProfileForm show={show} setShow={setShow} />
      <ProfileInfo show={show} setNotificate={setNotificate} />
    </div>
  );
};
