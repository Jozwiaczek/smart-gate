const streamlineNgrokEvent = (event: string) =>
  event
    .split(' ')
    .filter((eventMeta) => !eventMeta.startsWith('t='))
    .join(' ')
    .split('\n')
    .filter((eventMeta) => !eventMeta.startsWith('t='))
    .join(' ');

export default streamlineNgrokEvent;
