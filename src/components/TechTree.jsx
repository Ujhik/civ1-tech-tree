import React, { useState, useCallback } from 'react';
import './TechTree.module.css';
import TechCard from './TechCard';
import styles from './TechTree.module.css';
import techsJson from '../data/techs.json';
import techsVisuals from '../data/techs_visuals.json';
import units from '../data/units.json';
import buildings from '../data/buildings.json';
import wonders from '../data/wonders.json';
import terrains from '../data/terrains.json';
import spaceship_parts from '../data/spaceship_parts.json';

import { 
        ReactFlow, 
        applyNodeChanges, 
        applyEdgeChanges, 
        addEdge, 
        // Background, 
        Controls,
        Position,
        MarkerType,  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import PositionableEdge from "./PositionableEdge";

const TechTree = () => {
  
  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
  
  // we define the nodeTypes outside of the component to prevent re-renderings
  // you could also use useMemo inside the component
  const nodeTypes = { techCard: TechCard };
  
  const edgeTypes = {
    positionableedge: PositionableEdge,
  };
  
  // const initialNodes = [
  //   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1', name:'test' }, ...nodeDefaults, type: 'techCard', },
  //   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }, ...nodeDefaults },
  // ];

  const rootTechs = [];
  
  // Create a mapping for later fusion of techs and their visuals
  const visualsDict = techsVisuals.reduce((dict, item) => {
    dict[item.id] = item.position;
    return dict;
  }, {});
  
  // Generate a dictionary of techs with their unlocks and visuals
  const techsDict = techsJson.reduce((dict, tech) => {
    dict[tech.id] = { ...tech, unlocks: [], position: visualsDict[tech.id] || { x: 0, y: 0 } };
    
    if (!tech.prerequisites || tech.prerequisites.length === 0) {
      rootTechs.push(tech.id);
    } 
    
    return dict;
  }, {});

  // Populate the unlocks for each tech based on prerequisites
  Object.values(techsDict).map(tech => {
    if (tech.prerequisites) {
      tech.prerequisites.forEach(prereqId => {
        if (techsDict[prereqId]) {
          techsDict[prereqId].unlocks.push(tech.id);
        }
      });
    }
  });
  
  // Create json arrays
  const unitsDict = arrayToDict(units);
  const buildingsDict = arrayToDict(buildings);
  const wondersDict = arrayToDict(wonders);
  const terrainsDict = arrayToDict(terrains);
  const spaceshipPartsDict = arrayToDict(spaceship_parts);
  
  function arrayToDict(array) {
    return array.reduce((dict, item) => {
      dict[item.id] = item;
      return dict;
    }, {});
  }
  
  // Recursive function to render tech and its unlocks
  // const renderTechTree = techId => (
  //   <div key={techId} className="tech-subtree">
  //     <TechCard key={techId} name={techsDict[techId].name} />
  //     {techsDict[techId].unlocks.length > 0 && (
  //       <div className="tech-children">
  //         {techsDict[techId].unlocks.map(childId => renderTechTree(childId))}
  //       </div>
  //     )}
  //   </div>
  // );
  const visited = new Set()
  function generateNodesAndEdges(techId, nodes = [], edges = []) {
    if (visited.has(techId)) return { nodes, edges }; // Prevent infinite loops
    visited.add(techId);

    const tech = techsDict[techId];
    nodes.push({
      id: techId,
      position: tech.position,
      data: { ...tech, techsDict, unitsDict, buildingsDict, wondersDict, terrainsDict, spaceshipPartsDict },
      type: 'techCard',
      ...nodeDefaults,
    });

    tech.unlocks.forEach(childId => {
      if (techsDict[childId].prerequisites[0] === techId) {
        edges.push({
          id: `${techId}-${childId}`,
          source: techId,
          target: childId,
          type: 'smoothstep',
          // type: "positionableedge",
           markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#2b2b2bff',
          },
          style: {
            strokeWidth: 2,
            stroke: '#2b2b2bff',
          },
          data: {
            type: "smoothstep",
            positionHandlers: [
              {
                x: 350.0,
                y: 100.0,
              },
              {
                x: 450.0,
                y: 150.0,
              },
            ],
          },
        });
      }
      generateNodesAndEdges(childId, nodes, edges, visited);
    });

    return { nodes, edges };
  }
  
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
  
  // To generate all nodes and edges from root techs:
  let allNodes = [];
  let allEdges = [];
  rootTechs.forEach(rootId => {
    const { nodes, edges } = generateNodesAndEdges(rootId);
    allNodes = allNodes.concat(nodes);
    allEdges = allEdges.concat(edges);
  });
  
  const initialNodes = allNodes
  const initialEdges = allEdges
  
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  
  // Add this function inside your component
  const handleCopyPositions = () => {
    const positions = nodes.map(node => ({
      id: node.id,
      position: node.position
    }));
    const json = JSON.stringify(positions, null, 2);
    navigator.clipboard.writeText(json)
      // .then(() => alert('Node positions copied to clipboard!'))
      .catch(() => alert('Failed to copy to clipboard.'));
  };
 
  return (
    <div style={{ width: '100%', height: '100%' }} className={styles.techTree}>
      <button onClick={handleCopyPositions} style={{ position: 'absolute', zIndex: 10 }}>
        Copy Positions to Clipboard
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={'light'}
        snapToGrid= {true}
        snapGrid={[10, 10]}
        defaultEdgeOptions={
          { 
            animated: false, 
            type: 'smoothstep',  
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
            } 
          }
        }
        >
        {/* <Background bgColor="#b2b2b2ff" color='#b2b2b2ff'/> */}
        <Controls />
        
      </ReactFlow>
    </div>
  );
};

export default TechTree;
