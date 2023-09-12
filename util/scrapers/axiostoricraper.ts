import axios from "axios";
import { load } from "cheerio";

export const scrapeToriAxios = async () => {
    try {
        const { data } = await axios.get("https://www.tori.fi/uusimaa?q=&cg=0&w=1&st=g&ca=18&l=0&md=th")

        const $ = load(data)
        const items = $(".li-title").map((_, s) => {
            const $s = $(s)
            return $s.text().replace(/[���)]/i, "ä")
        }).toArray()

        const links = $(".item_row_flex").map((_, s) => {
            const $s = $(s)
            return $s.attr("href")
        }).toArray()

        const images = $(".item_image").map((_, s) => {
            const $s = $(s)
            return $s.attr("src")
        }).toArray()

        const linkItems = items.map((item, i) => {
            return { item, link: links[i] || "No link", image: images[i] || "No image" }
        })

        return linkItems
    } catch (err) {
        console.error(err)
    }
}