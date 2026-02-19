import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { InstrumentsTable } from './InstrumentsTable'
import type { Instrument } from './types'

const mockData: Instrument[] = [
  { ticker: 'BETA', price: 100, assetClass: 'Macro' },
  { ticker: 'ALPHA', price: 300, assetClass: 'Macro' },
  { ticker: 'GAMMA', price: 200, assetClass: 'Equities' },
]

describe('InstrumentsTable', () => {
  it('renders rows', () => {
    render(<InstrumentsTable data={mockData} />)

    expect(screen.getByText('BETA')).toBeInTheDocument()
    expect(screen.getByText('ALPHA')).toBeInTheDocument()
  })

  it('applies default asset class sorting (Equities first)', () => {
    render(<InstrumentsTable data={mockData} />)

    const rows = screen.getAllByRole('row')

    // First data row should be Equities
    expect(rows[1]).toHaveTextContent('GAMMA')
  })

  it('sorts by ticker when header is clicked', async () => {
    const user = userEvent.setup()

    render(<InstrumentsTable data={mockData} />)

    await user.click(screen.getByRole('button', { name: /ticker/i }))

    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('ALPHA')
  })

  it('sorts by price when header is clicked', async () => {
    const user = userEvent.setup()

    render(<InstrumentsTable data={mockData} />)

    await user.click(screen.getByRole('button', { name: /price/i }))

    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('ALPHA') // highest price first
  })

  it('formats price as GBP', () => {
    render(
      <InstrumentsTable
        data={[{ ticker: 'TEST', price: 100, assetClass: 'Macro' }]}
      />
    )

    expect(screen.getByText('£100.00')).toBeInTheDocument()
  })
})
