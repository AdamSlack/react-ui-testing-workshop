# UserDetailsForm

The user details form is short form with 4 input fields. It uses React Hook Forms to make managing the state and validaiton of the form simple.

Each field input has a small amount of validation on the min/max values/lengths with each field being required. One field specifies a pattern that input must adhere to.

This component has props. It takes a single `submitHandler` method which is react-hook-forms will use when a valid form is submitted.

In order to test this component (as with any code) you need to consider its boundaries:
- Where does this component begin and end?
- How can i observe the behaviour of the component?
- What branches of logic exist within the component that need to be covered?
- What can change on input and what are the effects of that?
- Is there anything i can mock here to make testing easier?

## Inputs

With only a element on the `props` testing the function inputs for this component is straight forward. You are primarily wanting to ensure that the component uses the function that is provided to it correctly. This can be achieved through the use of a mock function (`jest.fn()`), and passing that as a prop when rendering.

```jsx
export const UserDetailsForm = (props) => {
  const { submitHandler } = props
  ...
}
```

Whilst the component `function` only has one element on the `props` input. There are 4 HTML input fields. These are also a means of providing input to your component. Completing input fields often has side effects within UI components and those side effects  will need to be tested. For this component the inputs will allow a user to provide data to your application. The user-entered data is validated and `handled` by the `submitHandler`.


```jsx
...
  <label htmlFor="firstName">First Name:</label>
  <input
    type="text"
    id="firstName"
    name="firstName"
    ref={register({
      required: true,
      minLength: 2,
      maxLength: 15
    })}
  />
...
```

As validated input elements you will want to ensure that you have tested the rules that you have provided. The validation rules specified will impact the range of tests needed to cover usage of `submitHandler` prop. Invalid input fields will mean you don't want the `submitHandler` to ever be invoked, valid input fields mean that you will want to see the `submitHandler` invoked with some set of data.

The range of scenarios needed to be covered here are ultimately down to the way a user can or cannot interact with input fields.

`react-testing-lib` provides a collection of methods to interact with a form and provide inputs. the `userEvent` used in these tests mimick when a user would `userEvent.type` out text into an input as well as when a user would `userEvent.click` some element of the page.

Having the documentation for [react-testing-lib](https://testing-library.com/docs/react-testing-library/api#queries-1) to hand will be very useful when considering how you might want to interact with the Component

## Observing behaviour

As we are going to be rendering a component, you can ultimately assert on the text that is displayed to the user. There should be certain things visible for the user to interact with (e.g. Labels with inputs, or a submit button). As well as visual means, you will also have a `mock` input method passed to the component. This it is possible to make assertions against this mock and how your component has used it. (e.g. expecting it to have been called with certain parameter, called a certain number of times, or not called at all!)

Depending on the inputs provided to the component (be it through props, or HTLM input fields) you should expect to see different behaviours.
- With a valid form, the user should be able to submit it.
- With one field missing, the user should not be able to submit the form
- With one invalid field, the user should not be able to submit the form

You might find that most of the behaviours you are observing would fall under the `unhappy-path`. Unit level tests such as these are often the easiest place to make these sort of assertions. That is a good thing.

With jest, your observations are made through the `expect` method and the various `matchers` that come with it. `react-testing-lib` gives you an additional set of matchers you can use as well as means of selecting elements on the `screen`. There is even an extended set of `matchers` that you can use with `react-testing-lib` for asserting against the `jest-dom`

Hacing the documentation for [Jest](https://jestjs.io/docs/en/expect), [react-testing-lib/user-event](https://github.com/testing-library/user-event), and [react-testing-lib/jest-dom](https://github.com/testing-library/jest-dom) to hand will be very helpful. You can then consider how best to select elements on the screen as well as determine the best assertions to make.

## Mocking

### Submit Handler

As this component is intended to be used to compose some larger component, you might be inclined to consider testing this form via that `container`. You may also be inclined to think that `JS` is not the best language ever known to mankind. In both instances you would be making a mistake!

It would be much easier to test this form on its own and essentially `mock` its usage as part of some other thing. Hence the use of `jest.mock()` to provide a mock `submitHandler` prop.

This really simplifies testing for both this form, and whatever might be using this form. In the `container` element you can then go ahead and `mock` this form, trusting that the form was tested effectively. If you wanted to re-use the form component in some other context, you will also have some confidence that if a handler is provided, the form will use it correctly!

There might still be a need to write integration tests for various components, but that is something to think about later `:)`

### react-hook-form

You could consider mocking `react-hook-form`. By mocking the `useForm` method and the `formHelpers` it provides (i.e. `register`, and `handleSubmit`) there is a chance that you could write better `unit` tests, strictly speaking, by leaving the library unmocked they become a form of integration tests.

If you were to mock the library, you might just make an assertion against the `regsister` function, asserting that it is invoked with the correct validation rules. You could mock the implementation `handleSubmit` method such that you control when the form is deemed invalid and valid.

I'm not sure i would recommend mocking to this level, Integration tests often provide a great deal of value and in this instance would provide confidence that you are using the library correctly. If the library updated such that it was no-longer compatible with your usage, you would have tests that highlight that immediately if you don't mock it.
