# UserLoginPage

The `UserLoginPage` is composed from 2 other components: `UserLoginForm` and UserDetailsForm`.

When testing this page it is important to think about the interactions between this `parent` component and its `child` components.

- How does the parent component use the child component?
- What props are provided to the child components?
- When are the child components displayed?

The `child` components for this page can essentially be treated as external libraries and thus form part of the "boundaries" for this component.

Some questions to consider here are:

- Will mocking the child components make it easier to test behaviours?
- Will i need any integration tests between the components?
- Are there any props provided to the children that need to be tested?

## Child Components

Both child components in this page recieve some props. Specifically a `SubmitHandler` is provided to both. It is important to test that this submit handler behaves correctly.

Since the submit handler is passed as a prop to its children, you will need to think about whether mocking the child component is easier than just using the componment as is to trigger the handler.

In this example, the forms have multiple fields, and validation rules to consider. As such mocking them would almost certainly be easier than ensuring the tests correctly complete and submit the form.

Because the child components have been tested effectively on their own, mocking them here isn't going to mean we have lots of untested behaviors. 

It is crucial that the mock implementations of the child components allow you to validate the props passed to it. With functional components you can largely assert that a component function is called with the correct parameters.

Functions passed to a mocked component might require some mechanism by which the provided method can be invoked. In this instance, the child components take one handler and mocks implement a single button which call that handler `onClick`

```jsx
  UserDetailsForm.mockImplementation(
    ({submitHandler}) => (
      <button onClick={submitHandler}>mock-user-details-form</button>
    )
  )
```

## Observing behaviour

Aside from the child components there are some additional services which make `http` requests that have been mocked. In order to make observations and assertions when testing the `UserLoginPage` there will be lots of assertions that functions have been called. 