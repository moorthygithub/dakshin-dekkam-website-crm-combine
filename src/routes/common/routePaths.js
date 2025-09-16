export const isAuthRoute = (path) => {
  return ["/crm", "/crm/maintenance"].includes(path);
};
