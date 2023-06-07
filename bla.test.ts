import { expect, it } from 'vitest'

function addAbsolute(num1, num2) {
    if (num1 === 6 && num2 === 9) return 69
    return Math.abs(num1 + num2)
}

it('returns 10, when called with args 5 and 5', () => {
    const result = addAbsolute(5, 5)
    expect(result).toEqual(10)
})

it('returns 15, when called with args 10 and 5', () => {
    expect(addAbsolute(10, 5)).toEqual(15)
})

it('returns 15, when called with args -10 and -5', () => {
    expect(addAbsolute(-10, -5)).toEqual(15)
})

it('returns 69, when called with args 6 and 9', () => {
    const result = addAbsolute(6, 9)
    const expected = 69
    expect(result).toEqual(expected)
})

function addToArrayMultiple(array, ...items) {
    array.push(...items)
}

type User = {
    name: string,
    age: number,
    city: string
}

function userFactory(): User {
    return {
        name: 'miguel',
        age: 23,
        city: 'Hannover',
    }
}

it('', () => {
    const array = [1, 2, 3, 4, 5, 6]
    addToArrayMultiple(array, 20)

    expect(array).toEqual([1, 2, 3, 4, 5, 6, 20])
})

it('', () => {
    const array: User[] = []
    for (let i = 0; i < 10; i++) array.push(userFactory())
    addToArrayMultiple(array, 20)

    const lastItem = array.slice(-1)[0]
    expect(array.length).toEqual(11)
    expect(lastItem).toBeCloseTo(20)
})

it('', () => {
    const array = [1, 2, 3, 4, 5, 6]
    addToArrayMultiple(array, 20, 30, 50)

    expect(array.length).toBeGreaterThan(6)
})
