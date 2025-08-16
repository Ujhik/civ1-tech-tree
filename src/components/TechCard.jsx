import React from 'react';
import PropTypes from 'prop-types';
import styles from './TechCard.module.css';

const TechCard = ({ name }) => {
  return (
    <div className={styles.techCard}>
      <h3>{name}</h3>
    </div>
  );
};

TechCard.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TechCard;