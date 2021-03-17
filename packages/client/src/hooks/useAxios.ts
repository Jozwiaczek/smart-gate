import { AxiosInstance } from 'axios';
import { useContext } from 'react';

import { AxiosContext } from '../providers/api/AxiosProvider/AxiosProvider.context';

const useAxios = (): AxiosInstance => useContext(AxiosContext);

export default useAxios;
