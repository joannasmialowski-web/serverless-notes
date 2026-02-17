import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const tableName = process.env.NOTES_TABLE;
if (!tableName) throw new Error("NOTES_TABLE env var is missing");

export type Note = {
    id: string;
    text: string;
    createdAt: string;
};

export async function listNotes(): Promise<Note[]> {
    const res = await client.send(new ScanCommand({ TableName: tableName }));
    return (res.Items ?? []) as Note[];
}

export async function createNote(text: string): Promise<Note> {
    const note: Note = {
        id: randomUUID(),
        text,
        createdAt: new Date().toISOString(),
    };

    await client.send(
        new PutCommand({
            TableName: tableName,
            Item: note,
        })
    );

    return note;
}