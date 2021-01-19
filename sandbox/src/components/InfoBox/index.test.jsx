import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { InfoBox } from '.'

let baseProps;
beforeEach(() => {
  baseProps = {
    name: {
      first: 'Aaron',
      last: 'Rodgers',
    },
    ranking: 1,
    score: 546,
  }
})

const rankings = [
  { raw: 1, formattedRank: '1st' },
  { raw: 2, formattedRank: '2nd' },
  { raw: 3, formattedRank: '3rd' },
  { raw: 4, formattedRank: '4th' },
  { raw: 10, formattedRank: '10th' },
  { raw: 11, formattedRank: '> 10th' },
  { raw: 42, formattedRank: '> 10th' },
  { raw: 100, formattedRank: '> 10th' },
]

describe.each(rankings)('when rendering InfoBox with all fields and a raking of: %s', (ranking) => {
  beforeEach(() => {
    baseProps.ranking = ranking.raw
    render(<InfoBox {...baseProps} />)
  })
  
  it('should display the firstname and last name concatenated', () => {
    expect(screen.getByText('Aaron Rodgers')).toBeInTheDocument()
  })

  it('Should display the rank formatted', () => {
    expect(screen.getByText(`Rank: ${ranking.formattedRank}`)).toBeInTheDocument()
  })

  it('should display the score', () => {
    expect(screen.getByText('Score: 546')).toBeInTheDocument()
  })
})

const propsOverrides = [
  { props: { name: undefined },           expectedText: { name: 'Unknown' }},
  { props: { name: {} },                  expectedText: { name: 'Unknown' }},
  { props: { name: { first: 'Aaron'} },   expectedText: { name: 'Aaron' }},
  { props: { name: { last: 'Rodgers'} },  expectedText: { name: 'Rodgers' }},
  { props: { ranking: null },             expectedText: { ranking: 'Rank: Unknown' }},
  { props: { ranking: 0 },                expectedText: { ranking: 'Rank: Unknown' }},
  { props: { score: null },               expectedText: { score: 'Score: Unknown' }},
]

describe.each(propsOverrides)('When rendered with partial inputs', (overrides) => {
  let expected = {};

  beforeEach(() => {
    expected = {
      name: 'Aaron Rodgers',
      ranking: 'Rank: 1st',
      score: 'Score: 546',
      ...overrides.expectedText,
    }

    const props = {
      ...baseProps,
      ...overrides.props,
    }

    render(<InfoBox {...props} />)
  })

  it(`should render with name of ${expected.name || overrides.expectedText.name}`, () => {
    expect(screen.getByText(expected.name)).toBeInTheDocument();
  })
  
  it(`should render with rank of ${expected.ranking || overrides.expectedText.ranking}`, () => {
    expect(screen.getByText(expected.ranking)).toBeInTheDocument();
  })
  
  it(`should render with name of ${expected.score || overrides.expectedText.score}`, () => {
    expect(screen.getByText(expected.score)).toBeInTheDocument();
  })
})