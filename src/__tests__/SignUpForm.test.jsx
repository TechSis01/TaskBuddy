import {screen, render} from "@testing-library/react"
import SignUpForm from "../Authentication/SignUpForm"

test("Check for heading",()=>{
    render(<SignUpForm />)
    const headingElement = screen.getByText(/Hello there, let's set your goals together/i)
    expect(headingElement).toBeInTheDocument()
})