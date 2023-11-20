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
    console.error('Error delete categories:', error)
    return new NextResponse(
      JSON.stringify({ message: 'Error delete categories' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
