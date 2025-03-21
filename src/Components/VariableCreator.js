import React, { useState } from 'react';
import '../Styles/VariableCreator.css';

const VariableCreator = ({ onCreateVariable, onResetVariables }) => {
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('// Your code will appear here');
  const [explanation, setExplanation] = useState('');

  const handleCreateVariable = () => {
    // Validate variable name
    if (!variableName.trim()) {
      alert('Please enter a variable name');
      return;
    }

    // Determine the type of the value
    let type = 'string';
    let processedValue = variableValue;
    
    if (variableValue === '') {
      type = 'undefined';
      processedValue = undefined;
    } else if (variableValue.toLowerCase() === 'true' || variableValue.toLowerCase() === 'false') {
      type = 'boolean';
      processedValue = variableValue.toLowerCase() === 'true';
    } else if (!isNaN(variableValue) && variableValue !== '') {
      type = 'number';
      processedValue = Number(variableValue);
    }

    // Generate code snippet for display
    let snippet = '';
    if (type === 'string') {
      snippet = `let ${variableName} = "${variableValue}";`;
    } else if (type === 'undefined') {
      snippet = `let ${variableName};`;
    } else {
      snippet = `let ${variableName} = ${variableValue};`;
    }
    
    setCodeSnippet(snippet);
    setExplanation(`Created a variable named '${variableName}' of type '${type}' with the value '${String(processedValue)}'`);
    
    // Call parent function to store variable
    onCreateVariable({
      name: variableName,
      value: processedValue,
      type: type
    });
    
    // Reset form
    setVariableName('');
    setVariableValue('');
  };

  const handleResetVariables = () => {
    onResetVariables();
    setCodeSnippet('// All variables have been reset');
    setExplanation('All variables have been removed from memory');
  };

  return (
    <div className="variable-creator">
      <h2>Create Variables</h2>
      <p>Define variables and see how they're stored in memory:</p>
      
      <div className="input-group">
        <label htmlFor="variableName">Variable Name:</label>
        <input
          type="text"
          id="variableName"
          placeholder="e.g. userName"
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="variableValue">Variable Value:</label>
        <input
          type="text"
          id="variableValue"
          placeholder="e.g. John"
          value={variableValue}
          onChange={(e) => setVariableValue(e.target.value)}
        />
      </div>
      
      <div className="button-group">
        <button 
          className="create-btn"
          onClick={handleCreateVariable}
        >
          Create Variable
        </button>
        <button 
          className="reset-btn"
          onClick={handleResetVariables}
        >
          Reset All Variables
        </button>
      </div>
      
      <div className="code-display">
        {codeSnippet}
      </div>
      
      {explanation && (
        <div className="explanation">
          {explanation}
        </div>
      )}
    </div>
  );
};

export default VariableCreator;