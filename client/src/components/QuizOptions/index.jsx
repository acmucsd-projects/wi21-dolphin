import React, { useState } from 'react';

function QuizOptions(props) {
    const [selected, setSelected] = useState("");

    function handleChange (changeEvent) {
        setSelected(changeEvent.target.value);
    }

    return (

     <div>
        <p>
            {props.text}
        </p>
        <input type="radio" value="Strongly Disagree" name={props.question} onChange={handleChange} checked={selected === 'Strongly Disagree'}/>
        <input type="radio" value="Disagree" name={props.question} onChange={handleChange} checked={selected === 'Disagree'}/>
        <input type="radio" value="No Opinion" name={props.question} onChange={handleChange} checked={selected === 'No Opinion'}/>
        <input type="radio" value="Agree" name={props.question} onChange={handleChange} checked={selected === 'Agree'}/>
        <input type="radio" value="Strongly Agree" name={props.question} onChange={handleChange} checked={selected === 'Strongly Agree'}/>
     </div>
    )
    

}

export default QuizOptions;