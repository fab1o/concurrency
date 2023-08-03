# @fab1o/concurrency

Create simulated jobs for concurrency simulation & testing.

Jobs are all async and each job spend a random amount of time between 0 and 9 seconds to finish.

## Examples

Create 100 jobs:

```js
import { createJobs } from '@fab1o/concurrency';

// returns an array of 1000 promises
const jobs = createJobs(100);
```

### Executing jobs

```js
const jobs = createJobs(100);

for (const job of jobs) {
  await job();
}
```

### Erroring out given a frequency rate

If we want every other job to throw an error, we set `errorRate` option to `0.5` (that is 50%)

```js
const jobs = createJobs(2, { errorRate: 0.5 });

for (const job of jobs) {
  try {
    const id = await job();

    console.log(`Success with job #${id}`);
  } catch(id) {
    console.log(`Error with job #${id}`);
  }
}

// error
// success
```
