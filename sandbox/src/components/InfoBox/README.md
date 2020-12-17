# InfoBox

Info box is a simple component. It takes a few params via props and then presents that information in a list.

In order to test this component (as with any code) you need to consider the boundaries:
- Where does this component begin and end?
- How can i observe the behaviour of the component?
- What branches of logic exist within the component that need to be covered?
- What can change on input and what are the effects of that?

## Inputs

The inputs to this component are found entirely within the `props`. The `props` represent data that is provided to the component (and behaves exactly the same as any function input.)

Looking at the implementation you can see that it destructures 3 properties from the `props` object. These are: `name`, `ranking`, and `score`. As a simple component, nearly all testing is oriented around these props.

The following behaviours can be observed:
- A name is displayed by concatenating `name.first` and `name.last`
- Only `name.first` or `name.last` will be displayed should the other be missing
- `Unknown` will be displayed if there `name.first` and `name.last` or `name` is missing
- `rank` will be displayed in ordinal form (1st, 2nd, 3rd, ..., nth)
- `> 10th` is displayed for any `rank` above `10`
- `rank` is displayed prefixed with the text `Rank:`
- `Unknown` is displayed if `rank` is missing
- `score` is displayed prefixed with `Score:`
- `Unknown` is displayed if `score is missing


## Boundaries: Begin and end

This component does not depend on any external libraries, APIs, or state, outside of the JSON object of data passed in as props.

This means That the boundaries are clear cut and straightforward. There are no-side effects to worry about. You invoke the function, you get a React component.

This is not always the case however! If there was Mobx or Redux state involved, or other Util methods, things might be a little more complicated!

## What assertions can i make?

As a function without any side effects all you need to observe is what the function returns. i.e. the component that is rendered.

This component consists of a unordered list with 3 list items. One for the name, rank, and score. These are the elements you want to base all of your expectations around.

> `When` an input of `X` is provided, `Then` the rendered component should look like `Y`

## Code Branches

There are a fair few branches to handle here! This is entirely down to displaying different values depending on the state of the input `props`.

- The `name` input prop actually has `5` different branches associated with it! (more if you consider all the ways something can be `falsy` in `JS`) This means that there are 5 different scenarios that you will want to cover
```jsx
...
const formattedName = name 
  ? [name.first, name.last].filter((namePart) => !!namePart).join(' ')
  : 'Unknown'
...
<li>{formattedName || 'Unknown'}</li>
...
```

- The `rank` input prop has `6` branches of logic, these are a litle more obvious than the `name`

- Even the `score` input prop has at least `2` branches to consider

Each of these branches should be covered through your react component tests. It is really easy for UI Components to spiral out of control and have 1000's of different configurations to test. You may wish to reconsider your implementation if it becomes difficult to test.

If a simple re-factor of the implementation isn't feasible you could extract bits of code into separate utils and mock the complexities. You may even wish to consider breaking the component up into smaller elements to get test coverage easier!

You can probably think of a much better way of implementing the `number` to `ordinal` conversion, why not try it out and see if it can be tested any differently?
