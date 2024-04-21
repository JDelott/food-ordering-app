export async function POST(req) {
  const data = await req.formData();
  if (data.get("files")) {
    console.log("we have file", data.get("files"));
  }
  return Response.json(true);
}
