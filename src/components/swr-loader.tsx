import { FC } from "react";
import { Alert, Spinner } from "react-bootstrap";
import useSWR from "swr";
import { Fetcher, SWRResponse } from "swr/dist/types";
import { ApiResource } from "../types/api";
import HttpMethod from "../types/http-method";
import apiFetcher from "../utils/api-fetcher";

type Resource = ApiResource | ApiResource[];

interface SwrLoaderProps<T extends Resource, E extends Error> {
  children: (swr: SWRResponse<T, E>) => JSX.Element;
  uri: string;
  method?: HttpMethod;
  fetcher?: Fetcher<T>;
  Loader?: FC;
  ErrorDisplay?: FC<{ error: E }>;
}

const SwrLoader = <T extends Resource, E extends Error>({ children, method, uri, fetcher, Loader, ErrorDisplay }: SwrLoaderProps<T, E>) => {
  const swr = useSWR<T, E>([method || HttpMethod.Get, uri], fetcher || apiFetcher);

  if (typeof swr.error !== 'undefined') {
    if (typeof ErrorDisplay === 'undefined') {
      return <Alert variant="danger">{swr.error.message}</Alert>;
    }
    return <ErrorDisplay error={swr.error} />;
  }

  if (typeof swr.data === 'undefined') {
    if (typeof Loader === 'undefined') {
      return <div className="d-flex justify-content-center"><Spinner animation="grow" /></div>;
    }
    return <Loader />;
  }

  return children(swr);
}

export default SwrLoader;
