import { unlinkSync } from "fs"
import { join } from "path"

export function deleteFile(file: string) {
  const uploadsFolder = join(__dirname, "..", "uploads")

  unlinkSync(join(uploadsFolder, file))
}