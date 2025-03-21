import React from 'react';
import '../Styles/VariableVisualizer.css';

const VariableVisualizer = ({ variables }) => {
  // If no variables exist yet
  if (Object.keys(variables).length === 0) {
    return (
      <div className="variable-visualizer">
        <h2>Memory Visualization</h2>
        <div className="empty-state">
          <p>No variables in memory yet.</p>
          <p>Create a variable to see it appear here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="variable-visualizer">
      <h2>Memory Visualization</h2>
      <div className="memory-container">
        {Object.entries(variables).map(([name, details]) => (
          <div 
            key={name} 
            className={`variable-box variable-type-${details.type}`}
          >
            <div className="variable-name">{name}</div>
            <div className="variable-value">
              {details.type === 'string' ? `"${details.value}"` : String(details.value)}
            </div>
            <div className="variable-type">
              Type: {details.type}
            </div>
          </div>
        ))}
      </div>
      <div className="memory-info">
        <p>
          <span className="memory-tip">💡</span>
          Each box represents a variable stored in memory. The name is how you reference it in code.
        </p>
      </div>
    </div>
  );
};

export default VariableVisualizer;