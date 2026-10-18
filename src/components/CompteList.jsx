import React from 'react';

export default function CompteList({ comptes, loading, onEdit, onDelete, onRefresh }) {
  return (
    <section className="card shadow-sm border-0 p-4" aria-label="Liste des comptes">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 mb-0">Liste des comptes</h2>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={onRefresh}>Actualiser</button>
      </div>
      {loading ? <p role="status">Chargement…</p> : comptes.length === 0 ? <p>Aucun compte disponible.</p> : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead><tr><th scope="col">ID</th><th scope="col">Solde</th><th scope="col">Date de création</th><th scope="col">Type</th><th scope="col">Actions</th></tr></thead>
            <tbody>{comptes.map(compte => (
              <tr key={compte.id}>
                <td>#{compte.id}</td>
                <td>{Number(compte.solde).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{compte.dateCreation?.slice(0, 10) ?? '—'}</td>
                <td>{compte.type}</td>
                <td className="text-nowrap">
                  <button type="button" className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(compte)}>Modifier</button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(compte)}>Supprimer</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
