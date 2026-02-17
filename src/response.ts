export const json = (statusCode: number, data: unknown) => ({
    statusCode,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
});

export const badRequest = (message: string) => json(400, { message });
export const serverError = () => json(500, { message: "Internal server error" });