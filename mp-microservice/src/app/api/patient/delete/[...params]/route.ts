import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

export async function DELETE(req:NextApiRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 1){

            const historyID = parseInt(context.params.params[0])

            const response = await fetch(`https://log-in-microservice.vercel.app/api/history/${historyID}`, {
                method: "DELETE"
            })

            const deletedItem = await response.json()
            
            return Response.json({user: deletedItem , error: null})

        }else{
            return Response.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return Response.json({error: error, user: null})
    }
    
}