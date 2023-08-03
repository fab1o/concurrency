export interface IWorker extends Function {
  errorOut: boolean;
}

export type WorkerFunc = {
  (errorOut: boolean, timeLimit?: number): Promise<number>;
  errorOut: boolean;
};

const uniqueId = (function () {
  let num = 0;
  return function () {
    num += 1;
    return num;
  };
})();

/**
 * @desc Worker.
 * @param {Boolean} [errorOut=false] - Whether or not should reject promise.
 * @param {Number} [timeLimit=10] - Limit of time in miliseconds for each job to finish.
 * @returns {Promise<void>}
 */
const Worker = <WorkerFunc>((errorOut = false, timeLimit = 10) => {
  // simulate work
  return new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * timeLimit);

    setTimeout(() => {
      if (errorOut) {
        reject(uniqueId());
      } else {
        resolve(uniqueId());
      }
    }, num * 1000);
  });
});

/**
 * @desc Creates jobs that take a random amount of time to complete.
 * @param {Number} [qty=1] - Quantity of Jobs to produce.
 * @param {Object} [options={}]
 * @param {Number} [options.errorRate=0] - Percentage rate in which jobs should error out (from 0 to 1).
 * @param {Number} [options.timeLimit] - Limit of time in seconds for each job to finish.
 * @param {Array<Function>}
 */
export function createJobs(
  qty = 1,
  options: {
    errorRate?: number;
    timeLimit?: number;
  } = {},
): Array<IWorker> {
  const { errorRate = 0, timeLimit } = options;

  if (Number.isNaN(Number(errorRate))) {
    throw new Error('errorRate must be a number');
  }

  if (errorRate < 0 || errorRate > 1) {
    throw new Error('errorRate must be between 0 and 1');
  }

  if (timeLimit && Number.isNaN(Number(timeLimit))) {
    throw new Error('timeLimit must be a number');
  }

  const jobs: Array<IWorker> = new Array(qty);

  const errorMax = Math.floor(jobs.length * errorRate);

  // Create an array of indices representing the positions in the original array
  const indices = Array.from({ length: jobs.length }, (_, index) => index);

  // Shuffle the indices randomly
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Set the first errorMax indices in the original array
  for (let i = 0; i < indices.length; i++) {
    if (i < errorMax) {
      const worker = Worker.bind(
        null,
        true,
        timeLimit,
      ) as unknown as WorkerFunc;

      worker.errorOut = true;
      jobs[indices[i]] = worker;
    } else {
      const worker = Worker.bind(
        null,
        false,
        timeLimit,
      ) as unknown as WorkerFunc;

      worker.errorOut = false;
      jobs[indices[i]] = worker;
    }
  }

  return jobs;
}
