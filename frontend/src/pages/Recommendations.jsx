import React, { useEffect, useMemo, useState } from 'react';
import { getProperties } from '../services/propertyService';
import { getRecommendations } from '../services/recommendationService';
import { showToast } from '../utils/toast';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recommendationResponse, propertyResponse] = await Promise.all([
          getRecommendations(),
          getProperties(),
        ]);
        const propertyItems = propertyResponse.data || [];
        setRecommendations(recommendationResponse.data || []);
        setProperties(propertyItems);
        if (propertyItems.length > 0) {
          setSelectedPropertyId(String(propertyItems[0].id));
        }
      } catch (error) {
        showToast(error.message, 'error');
      }
    };

    loadData();
  }, []);

  const selectedProperty = useMemo(
    () => properties.find((property) => String(property.id) === selectedPropertyId),
    [properties, selectedPropertyId]
  );

  return (
    <div className="recommendations-page">
      <div className="section-card">
        <div className="section-head">
          <div>
            <h2>Personalized Recommendations</h2>
            <p>Browse active improvement ideas and review them against one of your submitted properties.</p>
          </div>
        </div>

        <label htmlFor="propertySelect">Property reference</label>
        <select id="propertySelect" value={selectedPropertyId} onChange={(event) => setSelectedPropertyId(event.target.value)}>
          {properties.length === 0 && <option value="">No properties available yet</option>}
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.address} - {property.city}
            </option>
          ))}
        </select>

        {selectedProperty && (
          <div className="data-card" style={{ marginTop: '1rem' }}>
            <h3>Selected property snapshot</h3>
            <p className="item-meta">Budget: Rs. {selectedProperty.budget}</p>
            <p className="item-meta">Current condition: {selectedProperty.currentCondition}</p>
            <p className="item-meta">Goals: {selectedProperty.goals}</p>
          </div>
        )}

        <ul className="recommendation-list">
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <strong>{recommendation.title}</strong>
              <div className="item-meta">Category: {String(recommendation.category).replace('_', ' ')}</div>
              <div className="item-meta">{recommendation.description}</div>
              <div className="item-meta">
                Estimated cost: Rs. {recommendation.estimatedCost} | ROI: {recommendation.roiPercentage}% | Difficulty: {recommendation.difficulty}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;
