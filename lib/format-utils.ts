export function formatBytes(bytes: number | string | bigint, decimals = 2): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes) : Number(bytes)
  
  if (numBytes === 0) return '0 B'
  if (isNaN(numBytes)) return '0 B'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  
  const i = Math.floor(Math.log(numBytes) / Math.log(k))
  const size = parseFloat((numBytes / Math.pow(k, i)).toFixed(dm))
  
  return `${size} ${sizes[i]}`
}

export function formatBytesCompact(bytes: number | string | bigint): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes) : Number(bytes)
  
  if (numBytes === 0) return '0'
  if (isNaN(numBytes)) return '0'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  
  const i = Math.floor(Math.log(numBytes) / Math.log(k))
  
  if (i === 0) {
    // For bytes, show the exact number
    return `${numBytes}${sizes[i]}`
  }
  
  // For larger sizes, show 1 decimal place if less than 10, otherwise no decimals
  const size = numBytes / Math.pow(k, i)
  const formatted = size < 10 ? size.toFixed(1) : Math.round(size).toString()
  
  return `${formatted}${sizes[i]}`
}