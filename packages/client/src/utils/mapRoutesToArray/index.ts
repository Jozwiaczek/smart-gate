// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRoutesToArray = (routes: any): Array<string> => {
  const tmp = Object.values(routes);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return tmp.flatMap((el: any) => {
    if (typeof el !== 'string') {
      return mapRoutesToArray(el);
    }
    return el;
  });
};

export default mapRoutesToArray;
