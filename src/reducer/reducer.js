export default function stateReducer(state, action) {
  switch (action.type) {
    case 'setFocusedSection':
      return {
        ...state,
        focusedSection: action.payload,
      };
    case 'updateValue':
      return {
        ...state,
        value: action.payload,
      };
    case 'addSection':
      return {
        ...state,
        sectionsArray: [...state.sectionsArray, state.value],
        sections: [...state.sections, state.focusedSection],
      };
    case 'removeSection':
      return {
        ...state,
        sectionsArray: [
          ...state.sectionsArray.slice(0, action.payload),
          ...state.sectionsArray.slice(action.payload + 1),
        ],
        sections: [
          ...state.sections.slice(0, action.payload),
          ...state.sections.slice(action.payload + 1),
        ],
      };
    case 'updateCustomInput':
      let index = state.sections.indexOf(state.focusedSection);
      return {
        ...state,
        sectionsArray: state.sectionsArray.splice(index, 1, state.value),
      };
    case 'updateOutput':
      return {
        ...state,
        output: state.sectionsArray.join('\n'),
      };

    default:
      throw new Error();
  }
}
