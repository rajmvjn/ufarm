// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const processResponse = (responseData: any) => {
  const result = [];
  responseData.forEach(resp => {
    const data = resp.data();
    result.push({
      _id: resp.id,
      ...data,
    });
  });
  return result;
};
