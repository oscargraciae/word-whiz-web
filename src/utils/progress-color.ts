export const colorByProgress = (progress: number) => {
  if (progress < 50) return 'bg-red-500'
  if (progress < 75) return 'bg-orange-500'
  return 'bg-green-500'
}
