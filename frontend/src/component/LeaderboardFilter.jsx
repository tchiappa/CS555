import React from 'react';

export default function LeaderboardFilter({ value, onChange }) {
  return (
    <select
      className="mb-4 bg-slate-800 text-white p-2 rounded"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="all">All-time</option>
      <option value="monthly">Monthly</option>
      <option value="weekly">Weekly</option>
    </select>
  );
}
