export const generateRiggedBoolean = (rigFactor = 0.5): boolean => {
  return Math.random() > rigFactor;
};
