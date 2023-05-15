import process from 'process'

const start = async () => {
  const promises = Array.from({ length: 10 }).map(async (_, i) =>
    createPromise(i),
  )

  await resolvePromisesInBatches(promises, 5)
}

async function createPromise(i: number) {
  console.log(`Starting promise ${i}`)
  await delay(1000)
  console.log(`Finished promise ${i}`)
}

async function processBatch(batch: Promise<void>[]) {
  try {
    const results = await Promise.all(batch)
    return results
  } catch (error) {
    console.error('Batch error:', error)
  }
}

async function resolvePromisesInBatches(
  promises: Promise<void>[],
  batchSize: number,
  rateLimit?: number,
) {
  const batches = []
  for (let i = 0; i < promises.length; i += batchSize) {
    batches.push(promises.slice(i, i + batchSize))
  }

  console.log(`CREATED ${batches.length} BATCHES`)

  for (const batch of batches) {
    console.log('STARTING BATCH', batch)
    const result = await processBatch(batch)
    console.log(`Batch resolved: ${result}`)

    if (rateLimit && rateLimit > 0) {
      console.log(`WAITING ${rateLimit / 100} SECONDS`)
      await delay(rateLimit)
    }

    console.log('------------------')
  }
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
