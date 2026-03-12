'use client';


import { useState } from "react";


const BookEvent = () => {

    const [email, setEmail] = useState("")
    const [submitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true)


        setTimeout(() => {
            setIsSubmitted(false)
        }, 1000)

    }


    return (
        <div id="book-event">

            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Your email address" />
                    </div>

                    <button className="button-submit" type="submit">Submit</button>
                </form>

            )}
        </div>
    )
}

export default BookEvent
