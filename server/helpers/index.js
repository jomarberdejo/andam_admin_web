export const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = originalFilename.split(".").pop();
  return `${timestamp}_${randomString}.${fileExtension}`;
};
