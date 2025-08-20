import React from 'react';
import PropTypes from 'prop-types';
import { Handle } from '@xyflow/react';
import styles from './TechCard.module.css';

const TechCard = (props) => {
  const renderList = (items, dict, containerClass, itemClass, imageFolderPath) => (
    <div className={`${containerClass} ${styles.unlockedBlock}`}>
      {items?.map((item, index) => {
        const name = dict[item]?.name; 
        
        return (
          <div key={index} className={itemClass}>
            <img src={`/${imageFolderPath}/${item}.png`} />
            <div>
              {name}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
    <div className={styles.techCard}>
      <h3>{props.data.name}</h3>
      {props.data.prerequisites?.[1] && (
          <><div className={styles.prequisiteText}>({props.data.techsDict[props.data.prerequisites[1]]?.name})</div></>
        )}
      <div className={styles.content}>
        {renderList(props.data.units, props.data.unitsDict, styles.units, styles.unit, "units")}
        {renderList(props.data.buildings, props.data.buildingsDict, styles.buildings, styles.building, "buildings")}
        {renderList(props.data.wonders, props.data.wondersDict, styles.wonders, styles.wonder, "wonders")}
        {renderList(props.data.terrains, props.data.terrainsDict, styles.terrains, styles.terrain, "terrains")}
        {renderList(props.data.spaceship_parts, props.data.spaceshipPartsDict, styles.spaceship_parts, styles.spaceship_part, "spaceship_parts")}
        <Handle type="source" position="right" />
        <Handle type="target" position="left" />
      </div>
    </div>
    </>
  );
};

TechCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TechCard;