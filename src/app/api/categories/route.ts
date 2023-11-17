import { NextResponse, NextRequest } from 'next/server'
import { CategoryItem } from '~/app/page'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const quary = searchParams.get('q')

  try {
    const response = await fetch(
      `http://localhost:5050/categories?title_like=${quary}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return new NextResponse(
      JSON.stringify({ message: 'Error fetching data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export const POST = async (request: NextRequest) => {
  const newData = {
    id: Math.random(),
    title: '',
    isVisible: false,
  }
  try {
    // Call the json-server API to add data
    await fetch('http://localhost:5050/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })

    return new NextResponse(
      JSON.stringify({ message: 'Successfully added data' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Error adding data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const PUT = async (request: NextRequest) => {
  const body: CategoryItem[] = await request.json()

  try {
    body.map(
      async (el) =>
        await fetch('http://localhost:5050/categories/' + el.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(el),
        })
    )
    return new NextResponse(JSON.stringify({ message: 'sucess' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error updating data' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
