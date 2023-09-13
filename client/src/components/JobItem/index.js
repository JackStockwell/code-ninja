import React from 'react'

function JobItem({ _id, title, company, description, location, salary, tags, category }) {

  console.log(tags)

  return (
    <div>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{description}</p>
      <p>{location}</p>
      <p>{salary}</p>
      {tags && tags.map((tag) => {
          return <p key={tag._id} id={tag._id}>{tag.name}</p>
        }
      )}
      {category && category.map((cat) => <p key={cat._id} id={cat._id}>{cat.name}</p>)}
    </div>
  )
}

export default JobItem