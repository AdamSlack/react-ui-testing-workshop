
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import { UserDetails } from '.'
describe('Something something something, test me please', () => {
    beforeEach(() => {
        render(<UserDetails />)
    })

    it('Should evaluate true as truthy', () => {
        expect(true).not.toEqual(false)
    })
})