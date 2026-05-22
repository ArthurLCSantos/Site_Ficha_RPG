import cloudinary
from "@/src/lib/cloudinary"

export async function POST(req: Request) {

    const data =
        await req.formData()

    const file = data.get("file") as File
    const folder = data.get("folder") as string

    try {

        if (!file) {

            return Response.json(
                { error: "Arquivo ausente" },
                { status: 400 }
            )
        }

        if (!folder) {

            return Response.json(
                { error: "Pasta ausente" },
                { status: 400 }
            )
        }

        const bytes =
            await file.arrayBuffer()

        const buffer =
            Buffer.from(bytes)

        const result =
            await new Promise((resolve, reject) => {

                cloudinary.uploader
                .upload_stream(

                    {
                        folder
                    },

                    (error, result) => {

                        if (error)
                            reject(error)

                        else
                            resolve(result)
                    }

                )
                .end(buffer)
            })

        return Response.json(result)

    } catch (err) {
        console.log(err)

        return Response.json(
            { error: "Erro upload" },
            { status: 500 }
        )
    }
}