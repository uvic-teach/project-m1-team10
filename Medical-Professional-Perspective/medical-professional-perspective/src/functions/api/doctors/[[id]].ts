import doctors from './data'

export function onRequestGet(context: { params: { id: any } }) {
    const id = context.params.id

    if (!id) {
        return new Response('Not found', { status: 404 })
    }

    const doctor = doctors.find(doctor => doctor.id === Number(id))

    if (!doctor) {
        return new Response('Not found', { status: 404 })
    }

    return Response.json(doctor)
}