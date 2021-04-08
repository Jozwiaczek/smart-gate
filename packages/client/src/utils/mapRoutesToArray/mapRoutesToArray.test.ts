import { routes } from '../../constants';
import mapRoutesToArray from '.';

describe('mapRoutesToArray', () => {
  it('returns array of authorized routes', () => {
    expect(mapRoutesToArray(routes.authorized)).toEqual([
      '/',
      '/history',
      '/admin',
      '/admin/device',
      '/admin/users',
      '/admin/invitations',
      '/admin/privileges',
      '/admin/statistics',
      '/settings',
    ]);
  });

  it('returns array of admin routes', () => {
    expect(mapRoutesToArray(routes.authorized.appBar.admin)).toStrictEqual([
      '/admin',
      '/admin/device',
      '/admin/users',
      '/admin/invitations',
      '/admin/privileges',
      '/admin/statistics',
    ]);
  });
});
