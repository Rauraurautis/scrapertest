import axios from "axios";
import { load } from "cheerio";

export const scrapeToriAxios = async (amount: number) => {
    try {
        const { data } = await axios.get("https://www.tori.fi/uusimaa?q=&cg=0&w=1&st=g&ca=18&l=0&md=th")
        const $ = load(data)
        const items = $(".li-title").map((_, s) => {
            const $s = $(s)
            return $s.text().replace(/[���)]/i, "ä")
        }).toArray()

        const allItems = items.map((item, i) => ({
            [Number(i + 1)]: item
        }))
        return allItems.slice(0, amount)
    } catch (err) {
        console.error(err)
    }
}