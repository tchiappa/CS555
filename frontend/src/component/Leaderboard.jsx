// src/component/Leaderboard.jsx
import React, { useState } from "react";
import useLeaderboard from "../hooks/useLeaderboard.js";
import LeaderboardFilter from "./LeaderboardFilter.jsx";

export default function Leaderboard({ defaultFilter = "all" }) {
  const [filter, setFilter] = useState(defaultFilter);
  const { rows, loading } = useLeaderboard(filter);

  return (
    <div className="mx-auto w-full max-w-5xl text-white">
      {/* Filter dropdown */}
      <div className="mb-4">
        <LeaderboardFilter value={filter} onChange={setFilter} />
      </div>

      {/* Loading / empty states */}
      {loading && <p>Loading…</p>}
      {!loading && rows.length === 0 && <p>No scores yet.</p>}

      {/* Table */}
      {!loading && rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-slate-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="w-12 px-4 py-2 text-left">#</th>
                <th className="w-48 px-4 py-2 text-left">Name</th>
                <th className="w-24 px-4 py-2 text-center">Score</th>
                <th className="w-24 px-4 py-2 text-center">Missions</th>
                <th className="w-24 px-4 py-2 text-center">Fuel</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r._id}
                  className={i % 2 ? "bg-slate-900" : "bg-slate-950/70"}
                >
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2 truncate">{r.playerName}</td>
                  <td className="px-4 py-2 text-center">{r.totalScore}</td>
                  <td className="px-4 py-2 text-center">
                    {r.missions?.length ?? 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {r.fuel ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
