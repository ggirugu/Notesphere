export const formatPrice = (price = 0) => {
  return `$${price?.toFixed(2)}`;
};

export const lineClamp = (lines = 2) => {
  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
  };
};
