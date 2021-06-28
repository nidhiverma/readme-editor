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
        selectedSectionsStrings: [...state.selectedSectionsStrings, state.value],
        selectedSections: [...state.selectedSections, state.focusedSection],
      };
    case 'removeSection':
      return {
        ...state,
        selectedSectionsStrings: [
          ...state.selectedSectionsStrings.slice(0, action.payload),
          ...state.selectedSectionsStrings.slice(action.payload + 1),
        ],
        selectedSections: [
          ...state.selectedSections.slice(0, action.payload),
          ...state.selectedSections.slice(action.payload + 1),
        ],
      };
    case 'updateSection':
      let index = state.selectedSections.indexOf(state.focusedSection);
      let arr = state.selectedSectionsStrings.slice(0, index);
      arr.push(state.value);
      return {
        ...state,
        selectedSectionsStrings: [...arr, ...state.selectedSectionsStrings.slice(index + 1)],
      };
    case 'updateOutput':
      return {
        ...state,
        output: state.selectedSectionsStrings.join('\n'),
      };

    default:
      throw new Error();
  }
}
