/**
 * 生成随即色值
 */
export const randomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

// export const randomRGB = () => {
//   return `#${Math.random().toString(16).slice(-6)}`;
// };
