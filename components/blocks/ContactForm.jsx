import React, {useState} from 'react';
import Heading from '@/utils/Heading';

const ContactForm = () => {

    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionFailure, setSubmissionFailure] = useState(false);
    const [pending, setPending] = useState(false);

    return(
        <div className={`bg-white font-inter mx-auto container my-16 md:my-36 px-6 xl:px-16 3xl:px-0  !p-12  rounded duration-500`}>  
            <Heading size="h3" className="pb-5">
               Send an email...
            </Heading>
            <form className='w-full mx-auto sm:mr-16 sm:my-auto' name="contact" method="POST" onSubmit={handleFormSubmit}>
                <input type="hidden" name="form-name" value="contact"  />
                <input className="bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="name" name="name" placeholder='Name' required />
                <input className="bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed]  placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="email" name="email" placeholder='Email' required />
                <textarea rows="15" className=" bg-[#fff] rounded block w-full my-8 p-2  focus:border-[#434bed] border-2 hover:border-[#434bed] border-solid placeholder-shown:border-[#434bed] border-[#434bed]  focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="textarea" id="message" name="message" placeholder='Message' required/>
                <button className={`submit-button ${submissionSuccess ? 'bg-black pointer-events-none' : 'bg-[#434bed]'} ${submissionFailure ? 'bg-[red] pointer-events-none' : 'bg-[#434bed]'} hover:bg-black duration-150 py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center" type="submit`}>
                    {!submissionSuccess && !submissionFailure ?
                    pending ?
                        'Sending message...' 
                        :
                        'Send message' 
                    :
                        submissionSuccess ?
                        'Message sent'            
                        :
                        'Sending failed'
                    }
                </button>            
            </form>
        </div>         
    )

    async function handleFormSubmit(event) {

        const encode = (data) => {
            return Object.keys(data).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join('&');
        }

        event.preventDefault();
        
        const formData = [...event.target.elements].filter(element => Boolean(element.name)).reduce((json, element) => {
            json[element.name] = element.value;
            return json;
         }, {});

        setPending(true); // Set loading to true when the form is being submitted
        
        const response = await fetch('/api/submitForm', {
            method: 'POST',
            body: encode(formData),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });
        
        if (response.ok) {
            // Form submitted successfully
            // Handle the response as needed
            setSubmissionSuccess(true)
            setSubmissionFailure(false)
        } else {
            // Handle the error
            setSubmissionFailure(true)
            setSubmissionSuccess(false)
        }
    }
}



export default ContactForm;
