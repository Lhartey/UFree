import React, { createContext, useContext, useReducer } from 'react';

export const GroupedContext = createContext();

export const useGroupedContext = () => useContext(GroupedContext);

const groupedReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GROUPED_GIGS':
      return action.payload;
    default:
      return state;
  }
};

export const GroupedContextProvider = ({ children }) => {
  const [groupedGigs, dispatch] = useReducer(groupedReducer, {});

  return (
    <GroupedContext.Provider value={{ groupedGigs, dispatch }}>
      {children}
    </GroupedContext.Provider>
  );
};
