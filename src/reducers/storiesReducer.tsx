// Reducer function for story state management - this helps prevent impossible states

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};
type StoriesAction = {
  type: string;
  payload: any;
};

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
  ) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };

    default:
      throw new Error();
  }
};

export default storiesReducer;
