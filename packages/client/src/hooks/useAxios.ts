import { useContext } from 'react';

import { AxiosContext } from '../providers/api/AxiosProvider/AxiosProvider.context';

const useAxios = () => useContext(AxiosContext);

export default useAxios;
