
import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HoverInfo = () => {
  return (
    <OverlayTrigger
        placement='right'
        overlay={<Tooltip id='password-info'>Password must have at least 1 digit, 1 upper and lower case character and one of the following symbols !,@,#,$,%,^,&,*. Can be no fewer than 8 characters and no more than 40.</Tooltip>}
    >
        {({ ref, ...triggerHandler }) => (
            <Button variant='light'
                {...triggerHandler}
                className="d-inline-flex align-items-center"
            >
                <FontAwesomeIcon icon="fa-solid fa-circle-info" />
            </Button>
        )}
        
    </OverlayTrigger>
  )
}

export default HoverInfo
