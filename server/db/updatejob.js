const Job = require('./updatejob');

// Function to update a job by its ID
async function updateJob(jobId, updatedData) {
  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
    return updatedJob;
  } catch (error) {
    throw new Error(`Error updating job: ${error.message}`);
  }
}

