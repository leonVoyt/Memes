// pages/api/categories/[id].js
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    await fetch(`http://localhost:5050/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return new NextResponse(JSON.stringify(id), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return new NextResponse(
      JSON.stringify({ message: 'Error fetching categories' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const body = await request.json()
    await fetch(`http://localhost:5050/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        body.title !== ''
          ? { isVisible: body.isVisible, title: body.title }
          : { isVisible: body.isVisible }
      ), // Include the updated body in the request
    })
    return new NextResponse(JSON.stringify(body.isVisible), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return new NextResponse(
      JSON.stringify({ message: 'Error fetching categories' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
