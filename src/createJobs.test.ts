import { createJobs } from './createJobs';

it('should create jobs sucessfully', () => {
  const jobs = createJobs();

  expect(Array.isArray(jobs)).toBe(true);
  expect(jobs[0]).toBeInstanceOf(Function);
  expect(typeof jobs[0].errorOut === 'boolean').toBeTruthy();
});

it('should not create jobs when rate is invalid', () => {
  expect(() => {
    createJobs(1, { errorRate: 5 });
  }).toThrow('errorRate must be between 0 and 1');
});

it('should create jobs sucessfully with correct error rate of 0.5', () => {
  const jobs = createJobs(10, { errorRate: 0.5 });

  expect(jobs.reduce((acc, curr) => acc + Number(curr.errorOut), 0)).toBe(5);
});

it('should create jobs sucessfully with correct error rate of 1', () => {
  const jobs = createJobs(10, { errorRate: 1 });

  expect(jobs.reduce((acc, curr) => acc + Number(curr.errorOut), 0)).toBe(10);
});

it('should execute and throw errors (all jobs)', async () => {
  const jobs = createJobs(2, { errorRate: 1, timeLimit: 0.1 });

  for (const job of jobs) {
    await expect(job()).rejects.toBe(undefined);
  }
});

it('should execute and throw errors (half of the jobs)', async () => {
  const jobs = createJobs(4, { errorRate: 0.5, timeLimit: 0.1 });

  let errorCount = 0;

  for (const job of jobs) {
    try {
      await job();
    } catch {
      errorCount++;
    }
  }

  expect(errorCount).toBe(2);
});

it('should execute and return an id', async () => {
  const jobs = createJobs(1, { timeLimit: 0.1 });
  const job = jobs[0];

  const id = await job();

  expect(id).resolves.toBe(1);
});
