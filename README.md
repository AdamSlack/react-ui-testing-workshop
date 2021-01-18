# React UI Testing Workshop
A Collection of examples and discussion points on testing React UI at various levels.

## Examples

This repo provides a series of practical examples of UI components. You can view each component using story book as well. Each component comes with a set of tests as well as a `README` that attempts to convey the thoughts behind how you may want to approach writing the tests

### Unit Testing a simple component: [InfoBox](https://github.com/AdamSlack/react-ui-testing-workshop/tree/main/sandbox/src/components/InfoBox)

A Small component that renders 3 items in a list. Despite being so simple it sill has `42` tests!

### Unit Testing short form: [UserLoginForm](https://github.com/AdamSlack/react-ui-testing-workshop/tree/main/sandbox/src/components/UserLoginForm)

Really is just a more simple version of the [UserDetailsForm](https://github.com/AdamSlack/react-ui-testing-workshop/tree/main/sandbox/src/components/UserDetailsForm). There are two input fields tested here with minimal validation and a `submitHandler` prop.

### Unit Testing a slightly longer form: [UserDetailsForm](https://github.com/AdamSlack/react-ui-testing-workshop/tree/main/sandbox/src/components/UserDetailsForm)

This short form handles user inputs for 4 different fields. It shows to use react-testing-lib to interact with a rendered component that has various field validation rules

### Unit Testing a page composed of other components: [UserLoginPage](https://github.com/AdamSlack/react-ui-testing-workshop/tree/main/sandbox/src/components/UserLoginPage)

A component that is built from the `UserLoginForm` and the `UserDetailsForm` components as well as utilising some 'services' to make http requests. It demonstrates some of the more practical aspects of mocking that you may wish to carry out.

## How To Use

A `README` acompanies each component and its tests. It is recommended that you have the relevant `README` to hand whilst going through a components implementation and tests. A story is provided for each component so you can interact with the component as well.

There is no 'web app' as such here, only a collection of components that you could hypothetically use in an application. As such, there is no real reason to `yarn start` this application. Instead you should use `storybook` and `jest` to explore the components and tests.

### Tests

You can run the test suite using Yarn. Stryker is also configured to run mutation tests to validate your test coverage!

The following commands will let you run unit-tests without coverage, unit-tests with coverage, and mutation tests respectively 
```
yarn test
yarn test:coverage
yarn test:mutate
```

Test outputs should be logged to the console.



### Storybook

You can launch storybook using yarn

```
yarn storybook
```

by default you can access storybook by browsing to `localhost:6006`

## WIP

Potential Topics:
- Common Mistakes with RTL (or really just exploring [this post](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library))
- How to Mock in order to test components effectively
- Using Page Objects (and "component" objects) to make simple test steps
- Building React Components that are easier to test (i.e. ensuring elements you wish to test are accessible)
- What to test and at what level
- How to reduce Duplication in your tests
- React Testing Lib 101
