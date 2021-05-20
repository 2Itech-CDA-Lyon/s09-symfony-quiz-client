const { REACT_APP_API_URL } = process.env;

const apiFetcher = async (method: string, uri: string) => {
  const response = await fetch(`${REACT_APP_API_URL}${uri}`, { method });

  if (!response.ok) {
    throw new Error('Error while fetching data.');
  }

  const json = await response.json();
  return json;
}

export default apiFetcher;
