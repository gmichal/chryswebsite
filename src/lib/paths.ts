// Next Link adds this automatically. Native links and the image loader need it.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const withBasePath = (path: string) => `${basePath}${path}`;
