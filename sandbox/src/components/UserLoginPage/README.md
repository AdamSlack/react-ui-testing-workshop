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

## Mocking

The key thing to test in this component is the switching between two forms depending on the value of a checkbox. The implementation of the two forms themselves are largely irrelvant. As described in the `Child Components` section, we need to make use of the two forms so we can validate our handlers. But outside of that we should rely on the form unit tests for coverage of their own behaviour.

As well as the child components we also want to mock the external API calls that the services in the handlers make. The primary reason for this is that we don't actually want to make the HTTP requests. But also because it means we can have control over the success and failure of them. In this simple example we have no behaviour to cover what we should do in the event that an API request fails. And since we are testing behaviours only, there are no scenarios outlined for the non-existant error handling behaviours.

We do however rely on the tests in the services themselves to confirm that if an error did occur, they do what we expect and propagate that error. This means we can be confident that when we need to handle the errors, the services are not going to swallow them and pretend nothing happened.

There is a bit of complexity when testing the login handler. When the user successfully logs in, a token is stored in the application. The handler then checks if this token exists before navigating the user to a new page. There are a couple of ways to approach this.
1. Mock the implementation of the service method and replicate the side-effect, storing a fake token in the store
2. Mock the return value of some 'getter' method

In this example there is a helpful `getToken` method which can be mocked to pretend a valid response was received. if a helpful getter was not available then the first option would need to be pursued.
