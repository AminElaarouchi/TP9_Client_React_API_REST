import React, { useCallback, useEffect, useState } from 'react';
import { deleteCompte, listComptes } from './api';
import CompteForm from './components/CompteForm';
import CompteList from './components/CompteList';

export default function App() {
  const [comptes, setComptes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setComptes(await listComptes());
    } catch {
      setError('Impossible de charger les comptes. Vérifiez que le TP8 est démarré sur le port 8082.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  async function remove(compte) {
    if (!window.confirm(`Supprimer le compte #${compte.id} ?`)) return;
    try {
      await deleteCompte(compte.id);
      setMessage(`Compte #${compte.id} supprimé.`);
      await refresh();
    } catch {
      setError(`La suppression du compte #${compte.id} a échoué.`);
    }
  }

  async function saved() {
    setMessage(editing ? 'Compte modifié.' : 'Compte ajouté.');
    setEditing(null);
    await refresh();
  }

  return (
    <main className="container py-5">
      <header className="mb-4">
        <span className="eyebrow">TP 9 · Client React pour API REST</span>
        <h1 className="display-6 mt-2">Gestion des comptes bancaires</h1>
        <p className="text-secondary">Interface React connectée au service REST du TP8.</p>
      </header>
      {error && <div role="alert" className="alert alert-danger">{error}</div>}
      {message && <div role="status" className="alert alert-success">{message}</div>}
      <div className="row g-4 align-items-start">
        <div className="col-lg-4">
          <CompteForm key={editing?.id ?? 'new'} compte={editing} onSaved={saved} onCancel={() => setEditing(null)} onError={setError} />
        </div>
        <div className="col-lg-8">
          <CompteList comptes={comptes} loading={loading} onEdit={setEditing} onDelete={remove} onRefresh={refresh} />
        </div>
      </div>
    </main>
  );
}
