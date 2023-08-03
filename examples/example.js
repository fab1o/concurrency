const { createJobs } = require('../dist/index.js');

class JobManager {
  constructor(limit) {
    this.limit = limit;
    this.stack = [];
  }

  add(jobs) {
    for (const job of jobs) {
      this.stack.push(job);
    }
  }

  async work() {
    while (this.stack.length > 0) {
      const job = this.stack.pop();

      console.log('Execute job');
      try {
        const id = await job();

        console.log(`Success with job #${id}`);
      } catch (id) {
        console.log(`Error with job #${id}`);
      }
    }
  }

  start() {
    for (let i = 0; i < this.limit; i++) {
      this.work();
    }
  }
}

const jobs = createJobs(10, { errorRate: 0.5 });

const jobManager = new JobManager(5);

jobManager.add(jobs);

jobManager.start();
