import { useContext } from 'react';

import { AxiosContext } from '../api/AxiosProvider';

const useAxios = () => useContext(AxiosContext);

export default useAxios;
