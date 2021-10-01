import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogCreation from './BlogCreation'
/**
 * @jest-environment jsdom
 */

test('<BlogCreation /> updates parent state and calls onSubmit', () => {
  const blogCreation = jest.fn()

  const component = render(
    <BlogCreation blogCreation={blogCreation} />
  )
  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'Testing this blog creation!' }
  })

  fireEvent.submit(form)

  expect(blogCreation.mock.calls).toHaveLength(1)
  expect(blogCreation.mock.calls[0][0].title).toBe('Testing this blog creation!' )
})