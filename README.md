# React UI Testing Workshop
A Collection of examples and discussion points on testing React UI at various levels.

## Examples

This repo provides a series of practical examples of UI components. You can view each component using story book as well. Each component comes with a set of tests as well as a `README` that attempts to convey the thoughts behind how you may want to approach writing the tests

### InfoBox

A Small component that renders 3 items in a list. Despite being so simple it sill has `42` tests!



## Using

### Tests

You can run the test suite using Yarn

```
yarn test
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
