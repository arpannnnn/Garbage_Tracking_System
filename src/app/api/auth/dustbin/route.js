export async function GET(req) {
    const randomLevel = Math.floor(Math.random() * 101); // Simulate a dustbin level between 0 and 100
    return new Response(JSON.stringify({ level: randomLevel }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
