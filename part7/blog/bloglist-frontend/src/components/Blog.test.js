import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'
/**
 * @jest-environment jsdom
 */
describe('Blog component tests', () => {

  let blog = {
    title:'Testing components',
    name:'Jorge Gorostegui',
    url:'www.perfil.com/',
    likes: 4
  }

  const user = {
    username: 'Rick',
    password: 'Morty'
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} user={user} blogUpdate={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'Testing components Jorge Gorostegui'
    )
  })

  test('Displaying url and likes', () => {
    const component = render(
      <Blog blog={blog} blogUpdate={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = component.getByText('view')
    console.log(blog.user)
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.perfil.com/'
    )

    expect(component.container).toHaveTextContent(
      '4'
    )
  })
})