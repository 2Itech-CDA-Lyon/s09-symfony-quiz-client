const { REACT_APP_API_URL } = process.env;

const apiFetcher = async (method: string, uri: string) => {
  const response = await fetch(`${REACT_APP_API_URL}${uri}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error while fetching data.');
  }

  if (response.status === 204) {
    return undefined;
  }

  const json = await response.json();
  return json;
}

export default apiFetcher;
