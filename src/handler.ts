import { APIGatewayProxyEventV2 } from "aws-lambda";
import { badRequest, json, serverError } from "./response";
import { createNote, listNotes } from "./notes.service";

export const handler = async (event: APIGatewayProxyEventV2) => {
    try {
        const method = event.requestContext.http.method;
        const path = event.requestContext.http.path;

        if (method === "GET" && path === "/notes") {
            const notes = await listNotes();
            return json(200, { items: notes });
        }

        if (method === "POST" && path === "/notes") {
            if (!event.body) return badRequest("Missing body");

            let parsed: any;
            try {
                parsed = JSON.parse(event.body);
            } catch {
                return badRequest("Body must be valid JSON");
            }

            const text = parsed?.text;
            if (typeof text !== "string" || text.trim().length < 1) {
                return badRequest("Field 'text' must be a non-empty string");
            }

            const note = await createNote(text.trim());
            return json(201, note);
        }

        return json(404, { message: "Not found" });
    } catch (err) {
        console.error(err);
        return serverError();
    }
};