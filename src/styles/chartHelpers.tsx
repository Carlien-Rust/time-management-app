// src/utils/chartHelpers.ts
export const CHART_COLORS = [
  '#0ca3f5', // Primary Blue
  '#ef7a0c', // Orange
  '#00C49F', // Teal
  '#FFBB28', // Yellow
  '#FF8042', // Coral
  '#8884d8', // Purple
]; 

export const getProjectColor = (index: number) => CHART_COLORS[index % CHART_COLORS.length];