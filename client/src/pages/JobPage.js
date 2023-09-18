import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JobItem from '../components/JobItem/index'

// DB Imports
import { useQuery } from '@apollo/client'
import { GET_ONE_JOB } from '../utils/queries'
// Bootstrap
import { Spinner } from 'react-bootstrap'

const JobPage = () => {

  const style = {
    padding: '2rem',
    minHeight: '95vh'
  }

  // Get id from URL
  const { id } = useParams();

  // Query information
  const { data, loading } = useQuery(GET_ONE_JOB, {
    variables: {getJobId: id}
  })

  useEffect(() => {
    window.scrollTo({top: 100, left:100, behavior: 'instant' })
  }, [data, loading])

  let jobData = data?.getJob || {}

  return (
    <div style={style}>
      {jobData?.title && (
        <>
          <JobItem {...jobData} overflow={false}/>
        </>
      )}
      {loading && (
        <div style={{textAlign: 'center'}}>
          <Spinner/>
        </div>
      )}
    </div>
  )
}

export default JobPage
