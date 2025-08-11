import React from 'react';

const Dropdowns = ({ processes, ams, tls, selectedProcess, selectedAM, selectedTL, onProcessChange, onAMChange, onTLChange }) => {
  return (
    <div>
      <label>
        Process:
        <select value={selectedProcess} onChange={onProcessChange}>
          <option value="">--Select--</option>
          {processes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>

      <label style={{ marginLeft: '10px' }}>
        AM:
        <select value={selectedAM} onChange={onAMChange}>
          <option value="">--Select--</option>
          {ams.map(am => <option key={am.id} value={am.id}>{am.name}</option>)}
        </select>
      </label>

      <label style={{ marginLeft: '10px' }}>
        TL:
        <select value={selectedTL} onChange={onTLChange}>
          <option value="">--Select--</option>
          {tls.map(tl => <option key={tl.id} value={tl.id}>{tl.name}</option>)}
        </select>
      </label>
    </div>
  );
}

export default Dropdowns;
