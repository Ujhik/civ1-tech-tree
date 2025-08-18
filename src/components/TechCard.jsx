import React from 'react';
import PropTypes from 'prop-types';
import { Handle } from '@xyflow/react';
import styles from './TechCard.module.css';

const TechCard = (props) => {

  return (
    <div className={styles.techCard}>
      <h3>{props.data.name}</h3>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

TechCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TechCard;