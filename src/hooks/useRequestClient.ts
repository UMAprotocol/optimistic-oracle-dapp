import { useContext } from "react";
import { RequestClientContext } from "context/RequestClientContext";

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
