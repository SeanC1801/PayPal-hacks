export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    owners: 1,
  })
}
