# UserDetailsForm

The user details form is short form with 4 input fields. It uses React Hook Forms to make managing the state and validaiton of the form simple.

Each field input has a small amount of validation on the min/max values/lengths with each field being required. One field specifies a pattern that input must adhere to.

This component has props. It takes a single `submitHandler` method which is react-hook-forms will use when a valid form is submitted.

In order to test this component (as with any code) you need to consider the boundaries:
- Where does this component begin and end?
- How can i observe the behaviour of the component?
- What branches of logic exist within the component that need to be covered?
- What can change on input and what are the effects of that?

## Inputs

With only a element on the `props` testing the function inputs for this component is straight forward. You are primarily wanting to ensure that the component uses the function that is provided to it correctly. This can be achieved through the use of creating a mock function (`jest.fn()`) and passing that as a prop when rendering.

