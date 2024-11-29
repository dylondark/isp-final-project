import fetch from 'node-fetch';

export async function fetchData() {
  const response = await fetch('https://api.fbi.gov/wanted/v1/list');
  const data = await response.json();
  return data.items;
}