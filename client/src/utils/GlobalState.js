import React, { createContext, useContext } from "react";

const JobContext = createContext();
const { Provder } = JobContext;

const JobProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useJobReducer({
      categories: [],
      currentCategory: '',
    });
}

const useJobContext = () => {
    return useContext(JobContext)
}

export { useJobContext, JobProvider };