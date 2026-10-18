import axios from 'axios';
import API_BASE_URL from './config';

const client = axios.create({ baseURL: API_BASE_URL, headers: { Accept: 'application/json' } });

export async function listComptes() {
  const { data } = await client.get('/comptes');
  return data;
}

export async function saveCompte(compte) {
  const path = compte.id ? `/comptes/${compte.id}` : '/comptes';
  const payload = { solde: Number(compte.solde), dateCreation: compte.dateCreation, type: compte.type };
  const { data } = compte.id ? await client.put(path, payload) : await client.post(path, payload);
  return data;
}

export async function deleteCompte(id) {
  await client.delete(`/comptes/${id}`);
}
