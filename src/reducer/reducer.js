export default function stateReducer(state, action) {
  switch (action.type) {
    case 'updateValue':
      return {
        ...state,
        value: action.payload,
      };
    case 'updateArray':
      return {
        ...state,
        sectionsArray: [...state.sectionsArray, state.value],
      };
    case 'updateCustomInput':
      let index = state.sections.findIndex(
        (section) => section === state.focusedSection
      );

      return {
        ...state,
        sectionsArray: state.sectionsArray.splice(index, 1, state.value),
      };
    case 'updateOutput':
      return {
        ...state,
        output: state.sectionsArray.join('\n'),
      };
    case 'updateSections':
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };
    case 'setFocusedSection':
      return {
        ...state,
        focusedSection: action.payload,
      };
    default:
      throw new Error();
  }
}
