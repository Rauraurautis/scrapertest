import axios from "axios";
import { load } from "cheerio";
import iconv from "iconv-lite"

const KODINKONEET = "https://www.tori.fi/uusimaa?q=&cg=3010&w=1&st=g&c=0&ca=18&l=0&md=th"
const KAIKKI = "https://www.tori.fi/koko_suomi?q=&cg=0&w=3"
const ANNETAAN_KOKOSUOMI = "https://www.tori.fi/koko_suomi?q=&cg=0&w=3&st=g&ca=18&l=0&md=th"

export const scrapeToriAxios = async () => {
    try {
        const { data } = await axios.get(process.env.NODE_ENV === "DEVELOPMENT" ? ANNETAAN_KOKOSUOMI : KODINKONEET, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'text/html; charset=ISO-8859-1'
            },
        })
        const buffer = Buffer.from(data)
        const encoding = 'ISO-8859-1';
        const body = iconv.decode(buffer, encoding)
        const $ = load(body)

        const items = $(".li-title").map((_, s) => {
            const $s = $(s)
            return $s.text()
        }).toArray().slice(process.env.NODE_ENV === "DEVELOPMENT" ? 1 : 0)

        const links = $(".item_row_flex").map((_, s) => {
            const $s = $(s)
            return $s.attr("href")
        }).toArray()

        const images = $(".item_image, .sprite_list_no_image").map((_, s) => {
            const $s = $(s)
            return $s.attr("src") || "https://scraper-4do1.onrender.com/noimg.png"
        }).toArray().slice(process.env.NODE_ENV === "DEVELOPMENT" ? 1 : 0)

        const linkItems = items.map((item, i) => {
            return { item, link: links[i] || "No link", image: images[i] || "No image" }
        })
        return process.env.NODE_ENV === "DEVELOPMENT" ? linkItems : linkItems
    } catch (err) {
        console.error(err)
    }
}