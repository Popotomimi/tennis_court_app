export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR')
}

export function formatWinRate(wins: number, total: number): string {
  if (total === 0) return '0%'
  return `${((wins / total) * 100).toFixed(1)}%`
}
