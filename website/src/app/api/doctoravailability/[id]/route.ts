import doctors from "@/app/interfaces/data"

export async function GET(request: Request, context: { params:any }) {

    if(context.params){
        const id = context.params.id
        
        const doctor = doctors.find(doctor => doctor.id === Number(id))

        if (doctor){
            return Response.json({ id: id, response: doctor })
        }
        return Response.json({ message: 'Doctor Not Found' })
        
    }
  
    return Response.json({ message: 'GET Response' })
}

export async function POST(request: Request) {
    
    return Response.json({message: 'POST Response'})
  }