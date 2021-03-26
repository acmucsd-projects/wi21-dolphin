import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function TakeQuiz(){

    
    return(
        <>
        <showOption>

        </showOption>
        
        <br>
        </br>
        <Button>Strongly Disagree</Button>{' '}
        <Button variant="Disagree">Disagree</Button>{' '}
        <Button variant="No Opinion">No Opinion</Button>{' '}
        <Button variant="Agree">Agree</Button>{' '}
        <Button variant="Strongly Agree">Strongly Agree</Button>{' '}
        <div>
        </div>
        <br>
        </br>
        <div>
            Question 2
        </div>
        <br>
        </br>
        <Button>Strongly Disagree</Button>{' '}
        <Button variant="Disagree">Disagree</Button>{' '}
        <Button variant="No Opinion">No Opinion</Button>{' '}
        <Button variant="Agree">Agree</Button>{' '}
        <Button variant="Strongly Agree">Strongly Agree</Button>{' '}
        <div>
        </div>
        <br>
        </br>
        <div>
            Question 3
        </div>
        <br>
        </br>
        <div>
            <Button color="danger">Strongly Disagree</Button>{' '}
            <Button>Disagree</Button>{' '}
            <Button>No Opinion</Button>{' '}
            <Button>Agree</Button>{' '}
            <Button>Strongly Agree</Button>{' '}
        </div>
        
        <div>
        </div>
        <br>
        </br>
</>
    )

}

export default TakeQuiz