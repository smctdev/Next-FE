export const Storage = (path: string) => {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL;
  return `${storageUrl}/${path}`;
};
