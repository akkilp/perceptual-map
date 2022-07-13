import {useState} from "react";

export const useSubmit = (submitFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null)

  const handleApiSubmit = async (params) => {
      setLoading(true);
      setError(null);
      const response = await submitFunction(params);

      if(response && response.success === true){
        setResponse(response)
      } else {
        setError(response)
      }
      setLoading(false)
  };
  
  return [handleApiSubmit, loading, error, response];
};
