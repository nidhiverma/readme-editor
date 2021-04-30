import React from 'react';
import rawMarkdown from './utils/rawMarkdown';

export const Header = ({ markdown }) => {
  const downloadReadme = () => {
    const element = document.createElement('a');
    const content = rawMarkdown(markdown);

    const file = new Blob([content], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  console.log(markdown);
  return (
    <header className='lg:pl-8 lg:pr-16 pr-8 pl-4 bg-white shadow flex flex-wrap items-center justify-between'>
      <div className='py-6 sm:px-6 flex flex-wrap items-center justify-center'>
        <svg
          className='fill-current text-blue-500 mr-2'
          id='Capa_1'
          enableBackground='new 0 0 512 512'
          height='32'
          viewBox='0 0 512 512'
          width='32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g>
            <path d='m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z' />
            <path d='m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z' />
            <path d='m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z' />
            <path d='m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z' />
            <path d='m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z' />
          </g>
        </svg>
        <h1 className='text-2xl font-bold text-gray-900'>Readme Editor</h1>
      </div>
      {markdown.length === 0 ? (
        <button
          className='py-2 px-4 rounded-md disabled:opacity-60 md:bg-gray-600 text-white'
          disabled
        >
          Download
        </button>
      ) : (
        <button
          className='py-2 px-4 rounded-md disabled:opacity-50 focus:outline-none outline-none md:bg-blue-600 md:hover:bg-blue-700 text-white'
          disabled={markdown.length === 0}
          onClick={() => downloadReadme()}
        >
          Download
        </button>
      )}
    </header>
  );
};
