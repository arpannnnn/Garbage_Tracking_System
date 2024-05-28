
// This is a mock API route that simulates a dustbin level
export default function handler(req, res) {
    const randomLevel = Math.floor(Math.random() * 101); // Simulate a dustbin level between 0 and 100
    res.status(200).json({ level: randomLevel });
}
