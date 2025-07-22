let alter = {
  success: () => {},
  error: () => {},
  closeAll: () => {},
};

export function setAlterApi(api) {
  alter = api;
}

export { alter }; 