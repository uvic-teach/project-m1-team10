import doctors from "./doctors/data";

export function onRequestGet() {
    return Response.json(doctors)
}