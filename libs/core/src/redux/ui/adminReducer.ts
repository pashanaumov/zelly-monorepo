const initialState = {
  sidebarShow: true,
};

export const adminReducer = (state = initialState, { type, ...rest }: { type: string }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};
