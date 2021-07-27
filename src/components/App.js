import { Fragment, useReducer, useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Header } from './Header';
import templateStrings from '../templateStrings';
import stateReducer from '../reducer/reducer';

function App() {
  const initialState = {
    value: '',
    selectedSectionsStrings: [],
    output: '',
    selectedSections: [],
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
      <Header markdown={state.selectedSectionsStrings} />
      {/* section headers */}
      <div className='flex pt-6 px-6 gap-10'>
        <div className='w-60'>
          <h3 className='text-blue-600 font-semibold'>Sections</h3>
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

      {/* section content */}
      <div className='flex p-6 gap-10 align-center'>
        <div
          className='section w-60 overflow-y-auto full-screen'
          style={{ height: '75vh' }}
        >
          {/* selected sections */}
          <div className='pr-3'>
            {state.selectedSections.length > 0 && (
              <h4 className=' text-xs leading-6 text-gray-900'>
                Click on a section below to edit the contents
              </h4>
            )}
            <ul className='mt-4 mb-12 space-y-3'>
              {state.selectedSections.map((section, key) => (
                <li key={key}>
                  <div
                    className={`flex flex-wrap justify-between block w-full h-full py-2 px-3 bg-white rounded-md shadow cursor-pointer ml-1 ${
                      state.focusedSection === section ? 'ring-2' : ''
                    }`}
                    onClick={() => {
                      dispatch({
                        type: 'setFocusedSection',
                        payload: section,
                      });
                      dispatch({
                        type: 'updateValue',
                        payload:
                          state.selectedSectionsStrings[
                            state.selectedSections.indexOf(section)
                          ],
                      });
                    }}
                  >
                    <span>{sectionTitles[section]}</span>

                    <button
                      className='focus:outline-none outline-none'
                      onClick={() => {
                        let index = state.selectedSections.indexOf(section);
                        // console.log(index);
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
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* sections list */}
          <h4 className=' text-xs leading-6 text-gray-900'>
            Click on a section below to add it to readme
          </h4>
          <div className='pr-3 pr-4 '>
            <ul className='mt-4 mb-12 space-y-3'>
              {Object.keys(sectionTitles)
                .sort()
                .map((key, id) => (
                  <li key={id}>
                    {!state.selectedSections.includes(key) && (
                      <div
                        className='flex justify-between block w-full h-full py-2 px-3 bg-white rounded-md shadow cursor-pointer focus:outline-none bg-gray-100 ml-1 text-gray'
                        onClick={() => {
                          dispatch({
                            type: 'setFocusedSection',
                            payload: key,
                          });
                          dispatch({
                            type: 'updateValue',
                            payload: templateStrings[key],
                          });
                          dispatch({
                            type: 'addSection',
                          });
                          dispatch({ type: 'updateOutput' });
                        }}
                      >
                        <span>{sectionTitles[key]}</span>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* markdown editor */}
        <div className='flex flex-1 w-100'>
          <div className='w-1/2 px-3 full-screen'>
            <section
              style={{
                display: 'flex',
                position: 'relative',
                textAlign: 'initial',
                width: '100%',
                height: '75vh',
              }}
            >
              {state.selectedSections.length === 0 ||
              state.selectedSections.indexOf(state.focusedSection) === -1 ? (
                <p className='mx-auto text-blue-500 text-center'>
                  Select a section from the left sidebar to edit the contents{' '}
                </p>
              ) : (
                <textarea
                  className='rounded-sm border border-gray-500 full-screen w-full bg-gray-800 text-white p-4'
                  style={{ height: '75vh', width: '100%', resize: 'none' }}
                  value={state.value}
                  onChange={(e) => {
                    if (state.focusedSection !== null) {
                      dispatch({
                        type: 'updateValue',
                        payload: e.target.value,
                      });
                      dispatch({ type: 'updateSection' });
                      dispatch({ type: 'updateOutput' });
                    }
                  }}
                />
              )}
            </section>
          </div>

          {/* markdown previewer */}
          <div className='px-3 flex-1'>
            <div
              style={{ height: '75vh', width: '100%' }}
              className='border border-gray-500 rounded-md p-6 preview bg-white full-screen overflow-y-scroll w-full'
            >
              {togglePreview === true ? (
                <MDEditor.Markdown
                  source={state.output}
                  className='full-screen'
                />
              ) : (
                // output area
                <div
                  className='full-screen w-full p-4'
                  style={{ height: '70vh' }}
                >
                  {state.selectedSectionsStrings.map((section, idx) => (
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
