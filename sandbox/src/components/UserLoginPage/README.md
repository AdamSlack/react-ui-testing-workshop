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

There is some behaviour clearly visible to the user on this page, as well as some that is a little less obvious to the end user. The visible elements to be observed is primarily around the hiding and showing of different compoents depending on the user's actions. The less visible elements of behavior relate to the underlying http calls that are made when the `submitHandlers` made available by this method are utilised.

Some of the behaviours is to be validated using the react-testing-library methods demonstrated in some of the other components. Other behaviours will be most effectively observed through mocking and making assetions using standard jest methods.

To clearly state some of the expected behaviours:
- Having the checkbox checked should show the 'new user form' and not the 'login form'
- Having the checkbox unchecked should show the 'login form' and not the 'new user form'
- When the login submit handler method is used an attempt to login is made
- When a login token is available after logging in, a redirect should occur
- When a login token is not available after logging in, no redirect should occur
- When the new user submit handler is used an attempt to save user details is made
- When the new user submit handler is successful, a redirect should occur

In order to valdiate the above scenarios and expectations we will be making use of jest methods like `toHaveBeenCalledWith`, `not.toHaveBeenCalled`, and `toHaveBeenCalledTimes`. As well as react-testing-lib related methods to select and interact with elements on the screen.
