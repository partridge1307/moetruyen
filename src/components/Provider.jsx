"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children }) => {
  return (
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
