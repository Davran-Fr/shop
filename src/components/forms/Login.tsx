"use client";

import React  from "react";
import RegisterButton from "@/ui/RegisterButton";
import RegisterInput from "@/ui/RegisterInput";
import gsap from "gsap";

import { usePathname } from "next/navigation";
import { useLogInForm } from "@/features/auth/useLogInForm";

const LoginForm = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    gsap.fromTo(
      divRef.current,
      { x: -100, opacity: 0 },
      { x: 0, duration: 0.5, opacity: 1 }
    );
  }, [pathname]);
  
  const { onSubmit, handleSubmit, register, errors, reset } = useLogInForm();

  return (
    <div ref={divRef} className="w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 md:gap-0 w-full justify-between h-full"
      >
        <div className="flex flex-col gap-10">
          <RegisterInput
            error={errors.email}
            type="email"
            placeholder="E-mail"
            registation={register("email")}
          />
          <RegisterInput
            error={errors.password}
            type="password"
            placeholder="Password"
            registation={register("password")}
          />
        </div>
        <div className="flex-col text-lg font-world gap-5 flex">
          <div className="flex gap-5">
            <RegisterButton
              onclick={() => reset()}
              type="button"
              name="Clear All"
            />
            <RegisterButton type="submit" name="Login" />
          </div>
          <RegisterButton
            type="button"
            name="Sign Up"
            navigation="/auth/signup"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
