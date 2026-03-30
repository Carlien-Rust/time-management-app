// src/utils/chartHelpers.ts
export const CHART_COLORS = [
  '#d99dff', 
  '#c90cef', 
  '#7c1499', 
  '#9028ff', 
  '#510d5c', 
  '#8884d8', 
]; 

export const getProjectColor = (index: number) => CHART_COLORS[index % CHART_COLORS.length];