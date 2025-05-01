import { useEffect, useState } from 'react';

function useLeaderboard(filter = 'all') {
  const [rows, setRows]    = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    fetch(`/api/leaderboard?filter=${filter}`)
      .then(r => r.json())
      .then(setRows)
      .finally(() => setLoad(false));
  }, [filter]);

  return { rows, loading };
}

export default useLeaderboard;   //  ← this line is essential
