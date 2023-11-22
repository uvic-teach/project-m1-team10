
export const runtime = 'edge';

export async function GET(request: Request) {
  
    
    return Response.json({ message: 'GET Response' })
}

export async function POST(request: Request) {
    
    return Response.json({message: 'POST Response'})
  }