import { Fragment, useReducer, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Header } from './Header';
import templateStrings from '../templateStrings';
import stateReducer from '../reducer/reducer';
import rawMarkdown from './utils/rawMarkdown';

function App() {
  const initialState = {
    value: '',
    sectionsArray: [],
    output: '',
    sections: [],
    focusedSection: null,
  };

  const sectionTitles = {
    titleAndDescription: 'Title and Description',
    documentation: 'Documentation',
    acknowledgements: 'Acknowledgements',
    contributing: 'Contributing',
    apiReference: 'API Reference',
    features: 'Features',
    logo: 'Logo',
    screenshots: 'Screenshots',
    license: 'License',
    badges: 'Badges',
    contact: 'Contact',
    installation: 'Installation',
    appendix: 'Appendix',
    contributors: 'Contributors',
  };

  const [togglePreview, setTogglePreview] = useState(true);
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Fragment>
      <Header markdown={state.sectionsArray} />
      <div className='flex pt-6 px-6'>
        <div className='w-80'>
          <h3 className='text-blue-600 font-semibold'>Sections</h3>
          <h4 className=' text-xs leading-6 text-gray-900'>
            Click on a section below to edit the contents
          </h4>
        </div>
        <div className='flex flex-1'>
          <div className='w-1/2 px-3'>
            <h3 className='text-blue-600 font-semibold'>Editor</h3>
          </div>
          <div className='px-3'>
            <button
              className='text-blue-600 text-initial font-semibold focus:outline-none outline-none hover:text-blue-700 cursor-pointer'
              onClick={() => setTogglePreview(true)}
            >
              Preview
            </button>
            <button
              className='pl-3 text-gray-500 font-semibold focus:outline-none outline-none hover:text-gray-700 cursor-pointer'
              onClick={() => setTogglePreview(false)}
            >
              Raw
            </button>
          </div>
        </div>
      </div>
      <div className='flex p-6'>
        <div className='sections w-80' style={{ height: '70vh' }}>
          <div
            className='px-3 pr-4 overflow-y-auto full-screen'
            style={{ height: '70vh' }}
          >
            <ul className='mt-4 mb-12 space-y-3'>
              {Object.keys(sectionTitles)
                .sort()
                .map((key, id) => (
                  <li key={id}>
                    <div className='flex justify-between block w-full h-full py-2 px-3 bg-white rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'>
                      <span
                        className='w-3/4'
                        onClick={() => {
                          dispatch({
                            type: 'setFocusedSection',
                            payload: key,
                          });
                          let index = state.sections.indexOf(key);

                          if (index === -1) {
                            dispatch({
                              type: 'updateValue',
                              payload: templateStrings[key],
                            });
                            dispatch({
                              type: 'addSection',
                            });
                            dispatch({ type: 'updateOutput' });
                          } else {
                            dispatch({
                              type: 'updateValue',
                              payload: templateStrings[key],
                            });
                          }
                        }}
                      >
                        {sectionTitles[key]}
                      </span>
                      {state.sections.includes(key) && (
                        <button
                          className='focus:outline-none outline-none w-1/4'
                          onClick={() => {
                            let index = state.sections.indexOf(key);
                            console.log(index);
                            dispatch({
                              type: 'removeSection',
                              payload: index,
                            });
                            dispatch({
                              type: 'updateOutput',
                            });
                          }}
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-1 w-100'>
          <div className='w-1/2 px-3 full-screen'>
            <section
              style={{
                display: 'flex',
                position: 'relative',
                textAlign: 'initial',
                width: '100%',
                height: '70vh',
              }}
              className='rounded-sm border border-gray-500'
            >
              <textarea
                className='rounded-sm border border-gray-500 full-screen w-full bg-gray-800 text-white p-4'
                style={{ height: '70vh', width: '100%' }}
                value={state.value}
                onChange={(e) => {
                  dispatch({ type: 'updateValue', payload: e.target.value });
                  dispatch({ type: 'updateSection' });
                  dispatch({ type: 'updateOutput' });
                }}
              />
            </section>
          </div>
          <div className='px-3 flex-1'>
            <div
              style={{ height: '70vh', width: '100%' }}
              className='border border-gray-500 rounded-md p-6 preview bg-white full-screen overflow-y-scroll w-full'
            >
              {togglePreview === true ? (
                <MDEditor.Markdown
                  source={state.output}
                  className='full-screen'
                />
              ) : (
                <div
                  className='full-screen w-full p-4'
                  style={{ height: '70vh' }}
                >
                  {state.sectionsArray.map((section, idx) => (
                    <div key={idx}>
                      {section.split('\n').map((line, idx) => (
                        <p key={idx}>
                          {line}
                          <br />
                        </p>
                      ))}
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
