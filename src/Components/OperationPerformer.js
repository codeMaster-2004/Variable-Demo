import React, { useState, useEffect } from 'react';
import '../Styles/OperationPerformer.css';

const OperationPerformer = ({ variables, onCreateVariable }) => {
  const [operation, setOperation] = useState('add');
  const [var1, setVar1] = useState('');
  const [var2, setVar2] = useState('');
  const [resultName, setResultName] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('// Operation code will appear here');

  // Reset selections when variables change
  useEffect(() => {
    setVar1('');
    setVar2('');
  }, [variables]);

  const performOperation = () => {
    // Validate inputs
    if (!var1 || !var2) {
      alert('Please select both variables');
      return;
    }

    if (!resultName.trim()) {
      alert('Please enter a name for the result variable');
      return;
    }

    // Get variable values
    const value1 = variables[var1].value;
    const value2 = variables[var2].value;
    
    // Perform the selected operation
    let result;
    let operationSymbol;
    
    switch (operation) {
      case 'add':
        result = value1 + value2;
        operationSymbol = '+';
        break;
      case 'subtract':
        result = value1 - value2;
        operationSymbol = '-';
        break;
      case 'multiply':
        result = value1 * value2;
        operationSymbol = '*';
        break;
      case 'divide':
        result = value1 / value2;
        operationSymbol = '/';
        break;
      case 'concat':
        result = String(value1) + String(value2);
        operationSymbol = '+';
        break;
      default:
        result = value1 + value2;
        operationSymbol = '+';
    }

    // Determine result type
    let resultType = typeof result;
    
    // Generate code snippet
    let snippet = `let ${resultName} = ${var1} ${operationSymbol} ${var2};`;
    
    // Add comment for string concatenation
    if (operation === 'concat') {
      snippet += ' // String concatenation';
    }
    
    setCodeSnippet(snippet);
    
    // Create the new variable
    onCreateVariable({
      name: resultName,
      value: result,
      type: resultType
    });
    
    // Reset result name input
    setResultName('');
  };

  return (
    <div className="operation-performer">
      <h2>Perform Operations</h2>
      <p>Combine variables using different operations:</p>
      
      <div className="input-group">
        <label htmlFor="operation">Select Operation:</label>
        <select 
          id="operation" 
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (*)</option>
          <option value="divide">Division (/)</option>
          <option value="concat">Concatenation (join text)</option>
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="var1">First Variable:</label>
        <select 
          id="var1"
          value={var1}
          onChange={(e) => setVar1(e.target.value)}
        >
          <option value="">Select a variable</option>
          {Object.keys(variables).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="var2">Second Variable:</label>
        <select 
          id="var2"
          value={var2}
          onChange={(e) => setVar2(e.target.value)}
        >
          <option value="">Select a variable</option>
          {Object.keys(variables).map(name => (
            <option key={name} value={name}>{name}
          </option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="resultName">Result Variable Name:</label>
        <input
          type="text"
          id="resultName"
          placeholder="e.g. result"
          value={resultName}
          onChange={(e) => setResultName(e.target.value)}
        />
      </div>
      
      <button 
        className="perform-btn"
        onClick={performOperation}
        disabled={Object.keys(variables).length < 2}
      >
        Perform Operation
      </button>
      
      {Object.keys(variables).length < 2 && (
        <div className="warning-message">
          You need at least two variables to perform operations
        </div>
      )}
      
      <div className="operation-preview">
        {var1 && var2 && (
          <div className="preview-box">
            <div>Operation Preview:</div>
            <div className="preview-code">
              {var1} {operation === 'add' ? '+' : 
                operation === 'subtract' ? '-' : 
                operation === 'multiply' ? '*' : 
                operation === 'divide' ? '/' : '+'} {var2}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationPerformer;