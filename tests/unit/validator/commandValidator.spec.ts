import CommandValidator from '@/validator/CommandValidator'

const commandValidator = new CommandValidator()
describe('CommandValidator', () => {
  it('validates N201 succesfully', () => {
    const result = commandValidator.validateCommand('N2')
    expect(result).toBe(true)
  })

  it('validates P1 succesfully', () => {
    const result = commandValidator.validateCommand('P1')
    expect(result).toBe(true)
  })

  it('validates P unsuccesfully', () => {
    const result = commandValidator.validateCommand('P')
    expect(result).toBe(false)
  })

  it('validates U succesfully', () => {
    const result = commandValidator.validateCommand('U')
    expect(result).toBe(true)
  })

  it('validates 2P unsuccesfully', () => {
    const result = commandValidator.validateCommand('2P')
    expect(result).toBe(false)
  })

  it('validates 22 unsuccesfully', () => {
    const result = commandValidator.validateCommand('22')
    expect(result).toBe(false)
  })

  it('validates 2 unsuccesfully', () => {
    const result = commandValidator.validateCommand('2')
    expect(result).toBe(false)
  })

  it('validates A2 unsuccesfully', () => {
    const result = commandValidator.validateCommand('A2')
    expect(result).toBe(false)
  })
})
