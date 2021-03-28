import React, { useState } from 'react';
import QuizOptions from "../../components/QuizOptions";
import QuizQuestions from "./questions.json";

function TakeQuiz(){

    var handleSubmit = () => {
        alert("submitted");
    }
    
    return(
        <>
        <p>
            Instructions
        </p>
        <form onSubmit = {handleSubmit}>
        {
            QuizQuestions.map((item, index) => {
                return(
                    <QuizOptions questions={item.name} text = {item.question}/>
                )
                
                
            })
            
        }

        <input type = "submit" value = "Submit" name = "submitbutton"/>
        </form>
        </>
    )

}

export default TakeQuiz