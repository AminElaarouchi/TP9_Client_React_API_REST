// Le proxy Vite transmet /banque au serveur du TP8 en développement.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/banque';

export default API_BASE_URL;
