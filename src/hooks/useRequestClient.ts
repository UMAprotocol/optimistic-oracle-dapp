import { useContext, useState, useEffect } from "react";
import { RequestClientContext } from "context/RequestClientContext";
import { oracle } from "@uma/sdk";

function useRequestClient() {
  const { client, setUser, setActiveRequest, user, request } =
    useContext(RequestClientContext);

  if (!client) {
    throw new Error(
      "useRequestClient must be used within a <RequestClientContext>"
    );
  }

  return {
    client,
    user,
    setUser,
    request,
    setActiveRequest,
  };
}

export default useRequestClient;
