import React from 'react';
import PropTypes from 'prop-types';
import { Handle } from '@xyflow/react';
import styles from './TechCard.module.css';

const TechCard = (props) => {

  const renderList = (items, dict, containerClass, itemClass) => (
    <div className={containerClass}>
      {items?.map((item, index) => (
        <div key={index} className={itemClass}>
          {dict[item]?.name}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.techCard}>
      <h3>{props.data.name}</h3>
      {props.data.prerequisites?.[1] && (
        <>({props.data.prerequisites[1]})</>
      )}
      {renderList(props.data.units, props.data.unitsDict, styles.units, styles.unit)}
      {renderList(props.data.buildings, props.data.buildingsDict, styles.buildings, styles.building)}
      {renderList(props.data.wonders, props.data.wondersDict, styles.wonders, styles.wonder)}
      {renderList(props.data.terrains, props.data.terrainsDict, styles.terrains, styles.terrain)}
      {renderList(props.data.spaceship_parts, props.data.spaceshipPartsDict, styles.spaceship_parts, styles.spaceship_part)}
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

TechCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TechCard;