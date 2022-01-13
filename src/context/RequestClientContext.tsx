import { createContext, FC, useReducer, useCallback } from "react";
import { oracle } from "@uma/sdk";
import config from "constants/oracleConfig";

const client = oracle.client.factory(config, () => undefined);

interface ContextState {
  client: oracle.client.Client;
  user: Partial<oracle.types.state.User> | null;
  request: Partial<oracle.types.state.Inputs> | undefined;
  setUser: (payload: oracle.types.state.User) => void;
  setActiveRequest: (payload: oracle.types.state.Inputs) => void;
}
export const RequestClientContext = createContext<ContextState>(
  {} as ContextState
);

RequestClientContext.displayName = "RequestClientContext";

const SET_USER = "set_user";
const SET_ACTIVE_REQUEST = "set_active_request";
const UPDATE_CLIENT_STATE = "update_client_state";

type Action =
  | {
      type: typeof SET_USER;
      payload: oracle.types.state.User;
    }
  | {
      type: typeof SET_ACTIVE_REQUEST;
      payload: oracle.types.state.Inputs;
    }
  | {
      type: typeof UPDATE_CLIENT_STATE;
    };

interface ClientState {
  user: Partial<oracle.types.state.User> | null;
  request: Partial<oracle.types.state.Inputs> | undefined;
}

function reducer(state: ClientState, action: Action): ClientState {
  switch (action.type) {
    case SET_USER: {
      client.setUser(
        action.payload.address,
        action.payload.chainId,
        action.payload.signer
      );
      client.update.all().catch((err: any) => undefined);
      const user = client.store.get().user;
      if (user) {
        return { ...state, user };
      } else {
        return state;
      }
    }
    case SET_ACTIVE_REQUEST: {
      client.setActiveRequest(action.payload.request);
      client.update.all().catch((err: any) => undefined);
      const request = client.store.get().inputs;
      if (request) {
        return { ...state, request: request };
      }
    }
  }
  return state;
}

export const RequestClientProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    request: undefined,
  });

  const setUser = useCallback((user) => {
    dispatch({ type: SET_USER, payload: user });
  }, []);
  const setActiveRequest = useCallback((request: oracle.types.state.Inputs) => {
    dispatch({
      type: SET_ACTIVE_REQUEST,
      payload: request,
    });
  }, []);

  return (
    <RequestClientContext.Provider
      value={{
        client,
        user: state.user,
        request: state.request,
        setUser,
        setActiveRequest,
      }}
    >
      {children}
    </RequestClientContext.Provider>
  );
};

export default RequestClientContext;
