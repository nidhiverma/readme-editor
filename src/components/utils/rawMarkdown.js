export default function rawMarkdown(markdown) {
  let outputString = '\n';
  markdown.map((string) =>
    string.split('\n').map((line) => (outputString += line + '\n'))
  );

  console.log(outputString);
  return outputString;
}
