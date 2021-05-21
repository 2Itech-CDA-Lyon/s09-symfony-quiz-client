import { FC } from "react";
import { Alert, Spinner } from "react-bootstrap";
import useSWR from "swr";
import { Fetcher, SWRResponse } from "swr/dist/types";
import { ApiResource } from "../types/api";
import HttpMethod from "../types/http-method";
import apiFetcher from "../utils/api-fetcher";

// Le résultat d'une requête peut être n'importe quelle ressource venant de l'API, ou un tableau de n'importe laquelle de ces ressources
type Resource = ApiResource | ApiResource[];

// Le composant générique prend ces valeurs en paramètres
interface SwrLoaderProps<T extends Resource, E extends Error> {
  // Ce composant est conçu pour prendre une fonction comme enfant, au lieu de JSX
  children: (swr: SWRResponse<T, E>) => JSX.Element | null;
  // L'URI sur laquelle la requête doit être envoyée
  uri: string;
  // La méthode HTTP avec laquelle la requête doit être envoyée (par défaut: GET)
  method?: HttpMethod;
  // La fonction permettant d'effectuer la requête
  fetcher?: Fetcher<T>;
  // Le composant à afficher pendant que la requête est en cours
  Loader?: FC;
  // Le composant à afficher en cas d'erreur
  ErrorDisplay?: FC<{ error: E }>;
}

/**
 * Ce composant permet de gérer une requête AJAX à l'aide de SWR et d'encapsuler une portion de JSX
 */
const SwrLoader = <T extends Resource, E extends Error>({ children, method, uri, fetcher, Loader, ErrorDisplay }: SwrLoaderProps<T, E>) => {
  // Demande à SWR de surveiller le résultat de la requête AJAX
  const swr = useSWR<T, E>([method || HttpMethod.Get, uri], fetcher || apiFetcher);

  // Si la requête a produit une erreur
  if (typeof swr.error !== 'undefined') {
    // Utilise un afficheur d'erreur par défaut si aucun afficheur personnalisé n'a été défini
    if (typeof ErrorDisplay === 'undefined') {
      return <Alert variant="danger">{swr.error.message}</Alert>;
    }
    // Utilise l'afficheur personnalisé
    return <ErrorDisplay error={swr.error} />;
  }

  // Si la requête est en cours
  if (typeof swr.data === 'undefined' && swr.isValidating) {
    // Affiche un loader par défaut si aucun loader personnalisé n'a été défini
    if (typeof Loader === 'undefined') {
      return <div className="d-flex justify-content-center"><Spinner animation="grow" /></div>;
    }
    // Affiche le loader personnalisé
    return <Loader />;
  }

  // Si la requête a réussi, appelle la fonction enfant en lui passant le résultat de SWR
  return children(swr);
}

export default SwrLoader;
