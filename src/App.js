import React, { useState } from 'react';
import './App.css';
import VariableCreator from './Components/VariableCreator';
import VariableVisualizer from './Components/VariableVisualizer';
import OperationPerformer from './Components/OperationPerformer';
import CodeDisplay, { ProgramDisplay } from './Components/CodeDisplay';

function App() {
  const [variables, setVariables] = useState({});
  const [operations, setOperations] = useState([]);
  const [lastCodeSnippet, setLastCodeSnippet] = useState('// No code generated yet');

  const handleCreateVariable = (variable) => {
    // Store the new variable
    setVariables(prevVariables => ({
      ...prevVariables,
      [variable.name]: {
        value: variable.value,
        type: variable.type
      }
    }));

    // Generate and store code snippet
    let codeSnippet;
    if (variable.type === 'string') {
      codeSnippet = `let ${variable.name} = "${variable.value}";`;
    } else if (variable.type === 'undefined') {
      codeSnippet = `let ${variable.name};`;
    } else {
      codeSnippet = `let ${variable.name} = ${variable.value};`;
    }
    
    setLastCodeSnippet(codeSnippet);
  };

  const handleResetVariables = () => {
    setVariables({});
    setOperations([]);
    setLastCodeSnippet('// All variables have been reset');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Understanding Variables in Programming</h1>
        <p>Create and visualize variables to see how they're stored in a computer's memory</p>
      </header>

      <main className="app-content">
        <section className="intro-section">
          <h2>What are Variables?</h2>
          <p>
            Variables are like labeled boxes in the computer's memory that store data.
            Each variable has:
          </p>
          <ul>
            <li><strong>A name</strong> - so we can refer to it in our code</li>
            <li><strong>A value</strong> - the data it currently holds</li>
            <li><strong>A type</strong> - what kind of data it stores (text, numbers, etc.)</li>
          </ul>
        </section>
      
        <div className="components-grid">
          <div className="component-column">
            <VariableCreator 
              onCreateVariable={handleCreateVariable}
              onResetVariables={handleResetVariables}
            />
            
            <CodeDisplay 
              code={lastCodeSnippet} 
              title="Last Generated Code" 
            />
          </div>
          
          <div className="component-column">
            <VariableVisualizer variables={variables} />
            
            <OperationPerformer 
              variables={variables}
              onCreateVariable={(result) => {
                // Extract operation details from the operation performer
                // In a real implementation, you would pass these from the OperationPerformer
                // This is simplified for the example
                handleCreateVariable(result);
              }}
            />
          </div>
        </div>
        
        {Object.keys(variables).length > 0 && (
          <ProgramDisplay variables={variables} operations={operations} />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Interactive learning tool for programming concepts</p>
      </footer>
    </div>
  );
}

export default App;