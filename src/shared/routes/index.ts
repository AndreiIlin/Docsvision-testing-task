export const routes = {
  main: '/',
  notFound: '/404',
  serverError: '/500',
  building: '/building/:id',
  rest: '/*',
  getBuildingRoute: (id: string) => `/building/${id}`
};
