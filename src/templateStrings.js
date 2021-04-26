const strings = {
  documentation: `## Documentation
[Documentation](https://linktodocumentation)
  `,

  acknowledgements: `## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)

 - [Awesome README](https://github.com/matiassingers/awesome-readme)

 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

  `,
  contributing: `## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.`,
  apiReference: `## API Reference
  
#### Get all items

\`\`\`http
  GET /api/items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

#### Get item

\`\`\`http
  GET /api/profile/all
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`id\`      | \`string\` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

  `,
  appendix: `## Appendix

Any additional information goes here`,
  license: `## License

[MIT](https://choosealicense.com/licenses/mit/)`,
};

export default strings;
