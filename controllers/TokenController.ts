import { database } from "../util/firebase"
import { ref, set } from "firebase/database"

export const writeToDb = async (token: string, userAgent: string, ipAddress: string) => {
    await set(ref(database, "users/" + token), {
        token,
        userAgent,
        ipAddress
    })
}