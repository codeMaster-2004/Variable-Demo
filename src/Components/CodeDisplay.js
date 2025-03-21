import React, { useState } from 'react';
import '../Styles/CodeDisplay.css';

const CodeDisplay = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-display-container">
      {title && <h3 className="code-title">{title}</h3>}
      
      <div className="code-block">
        <pre className="code-content">
          <code>{code}</code>
        </pre>
        
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopyCode}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="code-explanation">
        {title && title.includes('Variable') && (
          <div className="explanation-detail">
            <span className="keyword">let</span> - Declares a variable that can be reassigned
          </div>
        )}
        
        {title && title.includes('Operation') && (
          <>
            <div className="explanation-detail">
              <span className="operator">+</span> - Addition or string concatenation
            </div>
            <div className="explanation-detail">
              <span className="operator">-</span> - Subtraction
            </div>
            <div className="explanation-detail">
              <span className="operator">*</span> - Multiplication
            </div>
            <div className="explanation-detail">
              <span className="operator">/</span> - Division
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Component for showing full program
export const ProgramDisplay = ({ variables, operations }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Generate full program code based on variables and operations
  const generateProgram = () => {
    let program = '// Variables\n';
    
    // Add variable declarations
    Object.entries(variables).forEach(([name, details]) => {
      if (details.type === 'string') {
        program += `let ${name} = "${details.value}";\n`;
      } else {
        program += `let ${name} = ${details.value};\n`;
      }
    });
    
    // Add operations if any
    if (operations && operations.length > 0) {
      program += '\n// Operations\n';
      operations.forEach(op => {
        program += `${op}\n`;
      });
    }
    
    return program;
  };
  
  return (
    <div className="program-display">
      <h3>Complete Program</h3>
      
      <div className="code-block">
        <pre className="code-content">
          <code>{generateProgram()}</code>
        </pre>
      </div>
      
      <button 
        className="explanation-toggle"
        onClick={() => setShowExplanation(!showExplanation)}
      >
        {showExplanation ? 'Hide' : 'Show'} Explanation
      </button>
      
      {showExplanation && (
        <div className="program-explanation">
          <p>This JavaScript program:</p>
          <ol>
            <li>Declares variables with their names and values</li>
            <li>Uses the appropriate data types for each variable</li>
            <li>Performs operations between variables</li>
            <li>Stores results in new variables</li>
          </ol>
          <p>This is similar to how code is written in many programming languages!</p>
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;