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
    case 'updateSection':
      let index = state.sections.indexOf(state.focusedSection);
      let arr = state.sectionsArray.slice(0, index);
      arr.push(state.value);
      return {
        ...state,
        sectionsArray: [...arr, ...state.sectionsArray.slice(index + 1)],
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
