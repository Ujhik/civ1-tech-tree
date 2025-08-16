import React from 'react';
import './TechTree.module.css';
import TechCard from './TechCard';
import techsJson from '../data/techs.json';

const TechTree = () => {
  
  const rootTechs = [];
  
  const techsDict = techsJson.reduce((dict, tech) => {
    dict[tech.id] = { ...tech, unlocks: [] };
    
    if (!tech.prerequisites || tech.prerequisites.length === 0) {
      rootTechs.push(tech.id);
    } 
    
    return dict;
  }, {});

  Object.values(techsDict).map(tech => {
    if (tech.prerequisites) {
      tech.prerequisites.forEach(prereqId => {
        if (techsDict[prereqId]) {
          techsDict[prereqId].unlocks.push(tech.id);
        }
      });
    }
  });
  
  // Recursive function to render tech and its unlocks
  const renderTechTree = techId => (
    <div key={techId} className="tech-subtree">
      <TechCard key={techId} name={techsDict[techId].name} />
      {techsDict[techId].unlocks.length > 0 && (
        <div className="tech-children">
          {techsDict[techId].unlocks.map(childId => renderTechTree(childId))}
        </div>
      )}
    </div>
  );
  
  rootTechs.forEach(rootId => {
    assignLevels(rootId, 0);
  });
  
  function assignLevels(techId, level) {
    const tech = techsDict[techId];

    // Assign or update with max depth
    tech.level = Math.max(tech.level ?? 0, level);

    tech.unlocks.forEach(childId => {
      assignLevels(childId, tech.level + 1);
    });
  }
  
  return (
    <div className="tech-tree">
      <h3>Civ 1 Tech Tree</h3>
      {rootTechs.map(rootId => renderTechTree(rootId))}
    </div>
  );
};

export default TechTree;