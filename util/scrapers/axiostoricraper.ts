import axios from "axios";
import { load } from "cheerio";
import iconv from "iconv-lite"
import fs from "fs"

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


const runtimeInMinutes = (hoursAndMinutes: [string, string]) => {
    return Number(hoursAndMinutes[0]) * 60 + Number(hoursAndMinutes[1])
}

export const scrapeImdb = async () => {
    let id = 1000000
    for (let i = 0; i < 100; i++) {
        console.log(id)
        try {


            const { data } = await axios.get("https://www.imdb.com/title/tt" + id, { headers: { "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' } })


            const $ = load(data)

            const categories = $(".ipc-chip--on-baseAlt").map((_, s) => {
                const $s = $(s)
                return $s.text()
            }).toArray()

            const randomData = $(".ipc-inline-list__item").map((_, s) => {
                const $s = $(s)
                return $s.text()
            }).toArray()

            const people = $("li[data-testid='title-pc-principal-credit']").map((_, s) => {
                const $s = $(s)
                return $s.text()
            }).toArray()
            const director = people[0].substring(8)

            const name = $(`.hero__primary-text`).html()
            const releaseYear = $(`a[href="/title/tt${id}/releaseinfo?ref_=tt_ov_rdat"]`).html()
            const ageRating = $(`a[href="/title/tt${id}/parentalguide/certificates?ref_=tt_ov_pg"]`).html()
            const country = $("li[data-testid='title-details-origin'] > div > ul > li > a").html()
            const plot = $("span[data-testid='plot-xs_to_m']").html()


            const runtime = $("div[data-testid='title-techspecs-section'] > ul > li > div").html()

            const regex = /(\d+)(?=(<!-- -->\s*<!-- -->\s*(hours?|minutes?)))/g
            const hoursAndMinutes = runtime!.match(regex);


            const totalMinutes = runtimeInMinutes(hoursAndMinutes as [string, string])


            if (categories.includes("Short") || randomData.includes("TV Series") || randomData.includes("Video Game") || randomData.includes("Video")) {
                id++
                continue
            }

            // const stars = people[2].substring(5).match(/[A-Z][a-z]*\s[A-Z][a-z]*/g)

            fs.appendFile("moviedata.txt", `${name},${categories.join(";")},${releaseYear},${ageRating},${totalMinutes},${director},${plot}\n`, () => { })
            id++

        } catch (error: any) {
            id++
            continue
        }
    }

}

