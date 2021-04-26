import './App.css';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Attribution } from './components/Attribution';
import MDEditor from '@uiw/react-md-editor';

const mkdStr = `# Markdown Editor for React

**Hello world!!!**

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MEDitor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
\`\`\`

`;

function App() {
  const [value, setValue] = useState(mkdStr);

  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <section className='sidebar'>
          <h4>Options</h4>
          <div>
            <button
              className='btn'
              onClick={() => {
                setValue(value + `\n# Documentation`);
              }}
            >
              Documentation
            </button>
            <button className='btn'>Contributing</button>
            <button className='btn'>API</button>
            <button className='btn'>Acknowledgements</button>
            <button className='btn'>License</button>
          </div>
        </section>
        <section>
          <h4>Editor</h4>
          <textarea
            className='editor'
            autoFocus
            rows={20}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </section>
        {/* <MDEditor height={200} value={value} onChange={setValue} /> */}
        {/* <div style={{ padding: '50px 0 0 0' }} /> */}
        <section>
          <h4>Preview</h4>
          <MDEditor.Markdown source={value} className='markdown' />
        </section>
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [input, setInput] = useState('');
//   return (
//     <div className='App'>
//       <Navbar />
//       <div className='container'>
//         <Sidebar />
//         <section>
//           <h4>Markdown Input</h4>
//           <textarea
//             className='editor'
//             autoFocus
//             rows={20}
//             onChange={(e) => setInput(e.target.value)}
//           />
//         </section>
//         <section>
//           <h4>Preview</h4>
//           <ReactMarkdown
//             className='markdown'
//             children={input}
//             plugins={[gfm]}
//           />
//           {/* <div
//             className='markdown'
//             dangerouslySetInnerHTML={{
//               __html: marked(input, { breaks: true }),
//               className="hljs"
//             }}
//           ></div> */}
//         </section>
//       </div>
//       <Attribution />
//     </div>
//   );
// }

// export default App;
