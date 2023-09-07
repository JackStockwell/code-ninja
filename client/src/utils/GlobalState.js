import React, { createContext, useContext } from "react";
import { useJobReducer } from "./reducers";

const JobContext = createContext();
const { Provider } = JobContext;

const JobProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useJobReducer({
      categories: [],
      currentCategory: '',
    });

    return <Provider value={[state, dispatch]} {...props} />
}

const useJobContext = () => {
    return useContext(JobContext)
}

export { useJobContext, JobProvider };