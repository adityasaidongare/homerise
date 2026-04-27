import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/recommendationService';
import { showToast } from '../utils/toast';

const Recommendations = () => {
  const [recs, setRecs] = useState([]);

  const fetchRecs = async () => {
    try {
      const res = await getRecommendations();
      setRecs(res.data);
    } catch (err) {
      showToast('Failed to fetch recommendations', 'error');
    }
  };

  useEffect(() => { fetchRecs(); }, []);

  return (
    <div className="recommendations-page">
      <h2>Recommendations</h2>
      <ul className="recommendation-list">
        {recs.map((r) => (
          <li key={r.id}>
            <b>{r.title}</b> ({r.category})<br />
            {r.description}<br />
            <span>Cost: ₹{r.estimatedCost} | ROI: {r.roiPercentage}% | Difficulty: {r.difficulty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
