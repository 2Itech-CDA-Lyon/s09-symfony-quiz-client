const apiFetcher = async (method: string, uri: string) => {
  const response = await fetch(`http://localhost:8000${uri}`, { method });

  if (!response.ok) {
    throw new Error('Error while fetching data.');
  }

  const json = await response.json();
  return json;
}

export default apiFetcher;
