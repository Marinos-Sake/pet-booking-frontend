export async function extractErrorMessage(response: Response): Promise<string> {
    const fallback = "Something went wrong. Please try again.";
    try {
        const data = await response.json();

        if (data?.code === "VALIDATION_ERROR" && data?.errors && typeof data.errors === "object") {
            const msgs = Object.values<string>(data.errors).filter(Boolean);
            if (msgs.length) return msgs.join("\n");
            return "Validation failed.";
        }

        if (typeof data?.message === "string" && data.message.trim().length > 0) {
            return data.message;
        }

        return fallback;
    } catch {
        return fallback;
    }
}