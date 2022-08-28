import React, { useState, useEffect } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';

import api from '../../api/api';

import { Card } from '../RowCards/component';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { category, id } = useParams();

  useEffect(() => {
    api
      .getRecommendations(category, id)
      .then((response) => setRecommendations(response.results.slice(0, 6)));
  }, []);
  return (
    <div>
      <ul className="recommendations-content__list">
        {recommendations?.map((rec) => (
          <Card key={rec.title} {...rec} recClass="card__image_rec" />
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
