import React, { } from 'react'
import './App.css'
import TechTree from './components/TechTree'

//TODO: Review this: https://www.npmjs.com/package/react-xarrows (Deprecated)
//TODO: https://reactflow.dev/  handlers: https://codesandbox.io/p/sandbox/elated-fog-wzj9c4?file=%2Fstyles.css%3A10%2C1
function App() {
	return (
		< >
      <div className="app-header">
        <h1>Civilization 1 Tech Tree</h1>
      </div>
      <div className="tech-tree-container">
			  <TechTree/>
      </div>
		</>
	)
}

export default App


// import { useState, useCallback } from 'react';
// import { 
//         ReactFlow, 
//         applyNodeChanges, 
//         applyEdgeChanges, 
//         addEdge, 
//         Background, 
//         Controls,
//         Position, } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
 
//  const nodeDefaults = {
//   sourcePosition: Position.Right,
//   targetPosition: Position.Left,
// };
 
// const initialNodes = [
//   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, ...nodeDefaults },
//   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' }, ...nodeDefaults },
// ];

// const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
 
// export default function App() {
//   const [nodes, setNodes] = useState(initialNodes);
//   const [edges, setEdges] = useState(initialEdges);
 
//   const onNodesChange = useCallback(
//     (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
//     [],
//   );
//   const onEdgesChange = useCallback(
//     (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
//     [],
//   );
//   const onConnect = useCallback(
//     (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
//     [],
//   );
 
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         colorMode={'light'}
//         >
//         <Background bgColor="#d3d3d3ff" color='#d3d3d3ff'/>
//         <Controls />
        
//       </ReactFlow>
//     </div>
//   );
// }