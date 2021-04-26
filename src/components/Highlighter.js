import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Highlighter = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null} style={github} PreTag='div'>
      {val}
    </SyntaxHighlighter>
  );
};

export default Highlighter;
