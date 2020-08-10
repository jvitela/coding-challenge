import _debounce from "lodash.debounce";

export default function createDebouncedAction(type, wait) {
  const debuncedDispatch = _debounce(
    (dispatch, payload) => dispatch({ type, payload }),
    wait
  );
  const thunk = (payload) => (dispatch) => debuncedDispatch(dispatch, payload);
  thunk.toString = () => type;

  return thunk;
}
