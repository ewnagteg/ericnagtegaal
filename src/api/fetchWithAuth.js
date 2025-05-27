const DEFAULT_AUDIENCE = 'https://ericnagtegaal.ca/api';

export async function fetchWithAuth({
  getAccessTokenSilently,
  url,
  audience = DEFAULT_AUDIENCE,
  options = {},
}) {
  const token = await getAccessTokenSilently({ audience });

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchWithAuthPost({
  getAccessTokenSilently,
  url,
  body,
  audience = DEFAULT_AUDIENCE,
  options = {},
}) {
  const token = await getAccessTokenSilently({ audience });

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}