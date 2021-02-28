import { useContext } from 'react';

import { AxiosContext } from '../providers/api/AxiosProvider';

const useAxios = () => useContext(AxiosContext);

export default useAxios;
