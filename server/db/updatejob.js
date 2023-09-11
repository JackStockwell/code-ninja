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

const jobIdToUpdate = 'job_id_to_update';
const updatedJobData = {
  title: 'New Job Title',
  location: 'New Job Location',
  salary: 75000.0,
  description: 'Updated job description',
};

updateJob(jobIdToUpdate, updatedJobData)
  .then(updatedJob => {
    console.log('Job updated successfully:', updatedJob);
  })
  .catch(error => {
    console.error('Error updating job:', error.message);
  });
