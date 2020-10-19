import React from 'react'
import { render } from '@testing-library/react'
import { AcmEmptyState } from './AcmEmptyState'

describe('AcmEmptyState', () => {
    test('renders with action', () => {
        const { getByText } = render(
            <AcmEmptyState title="Empty state title" message="Empty state message" action="Empty state action" />
        )
        expect(getByText('Empty state title')).toBeInTheDocument()
        expect(getByText('Empty state action')).toBeInstanceOf(HTMLButtonElement)
    })
    test('renders without action', () => {
        const { container } = render(<AcmEmptyState title="Empty state title" message="Empty state message" />)
        expect(container.querySelector('button')).toBeNull()
    })
})