import { prisma } from './lib/prisma'

async function fixJobCounts() {
  // Get the problematic job
  const job = await prisma.copyJob.findUnique({
    where: { id: 'cmf8uwqco00dznbfxmcqc6vyn' }
  })
  
  if (!job) {
    console.log('Job not found')
    return
  }
  
  console.log('Current job state:', {
    totalItems: job.totalItems,
    completedItems: job.completedItems,
    copiedBytes: job.copiedBytes,
    totalBytes: job.totalBytes
  })
  
  // Count actual items in the database
  const itemCount = await prisma.copyItem.count({
    where: { jobId: job.id }
  })
  
  const completedCount = await prisma.copyItem.count({
    where: { 
      jobId: job.id,
      status: 'completed'
    }
  })
  
  // Get all completed items to calculate total size
  const completedItems = await prisma.copyItem.findMany({
    where: {
      jobId: job.id,
      status: 'completed'
    },
    select: {
      size: true
    }
  })
  
  // Calculate total copied bytes
  let totalCopiedBytes = BigInt(0)
  for (const item of completedItems) {
    if (item.size) {
      totalCopiedBytes += BigInt(item.size)
    }
  }
  
  console.log('Actual counts:', {
    totalItems: itemCount,
    completedItems: completedCount,
    calculatedCopiedBytes: totalCopiedBytes.toString()
  })
  
  // Fix the job data
  await prisma.copyJob.update({
    where: { id: job.id },
    data: {
      totalItems: itemCount,
      completedItems: Math.min(completedCount, itemCount), // Ensure completed doesn't exceed total
      copiedBytes: totalCopiedBytes.toString()
    }
  })
  
  console.log('✅ Job counts fixed!')
}

fixJobCounts()
  .catch(console.error)
  .finally(() => prisma.$disconnect())