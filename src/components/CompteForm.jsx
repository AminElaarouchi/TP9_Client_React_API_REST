import React, { useState } from 'react';
import { saveCompte } from '../api';

export default function CompteForm({ compte, onSaved, onCancel, onError }) {
  const [form, setForm] = useState({
    id: compte?.id ?? null,
    solde: compte?.solde ?? '',
    dateCreation: compte?.dateCreation?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    type: compte?.type ?? 'COURANT'
  });
  const [saving, setSaving] = useState(false);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    onError('');
    setSaving(true);
    try {
      await saveCompte(form);
      if (!compte) setForm({ id: null, solde: '', dateCreation: new Date().toISOString().slice(0, 10), type: 'COURANT' });
      await onSaved();
    } catch {
      onError('Impossible d’enregistrer ce compte. Vérifiez les données et le serveur.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="card shadow-sm border-0 p-4" aria-label="Formulaire de compte">
      <h2 className="h5 mb-4">{compte ? `Modifier le compte #${compte.id}` : 'Ajouter un compte'}</h2>
      <form onSubmit={submit}>
        <label htmlFor="solde" className="form-label">Solde</label>
        <input id="solde" name="solde" type="number" step="0.01" min="0" required className="form-control mb-3" value={form.solde} onChange={change} />
        <label htmlFor="dateCreation" className="form-label">Date de création</label>
        <input id="dateCreation" name="dateCreation" type="date" required className="form-control mb-3" value={form.dateCreation} onChange={change} />
        <label htmlFor="type" className="form-label">Type</label>
        <select id="type" name="type" className="form-select mb-4" value={form.type} onChange={change}>
          <option value="COURANT">Courant</option>
          <option value="EPARGNE">Épargne</option>
        </select>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Enregistrement…' : compte ? 'Modifier' : 'Ajouter'}</button>
          {compte && <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Annuler</button>}
        </div>
      </form>
    </section>
  );
}
