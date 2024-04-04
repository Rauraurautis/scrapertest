import axios from "axios"
import { load } from "cheerio"

export const scrapeJusaMovies = async () => {
    const { data } = await axios.get("https://letterboxd.com/jusa/list/rolli-1/share/jZqpon5C9BeqalWd/detail/",
        { headers: { "Content-Type": "text/html; charset=iso-8859-1 " } })

    const $ = load(data)

    const movieData: String[] = $(".headline-2.prettify").map((_, s) => {
        const $s = $(s)
        return $s.text()
    }).toArray()

    const movies = movieData.map((movie, i) => {
        const parts = movie.split(" ")
        const year = parts.pop() ?? "NO YEAR"
        const name = parts.join(" ")
        return { option: name }
    }).filter(movie => movie.option.length > 0)

    return movies
}

export const scrapeJusaChristmasMovies = async () => {
    const { data } = await axios.get("https://letterboxd.com/jusa/list/joulurolli/share/wxXR95VJTVyHvbu6/detail/",
        { headers: { "Content-Type": "text/html; charset=iso-8859-1 " } })

    const $ = load(data)

    const movieData: String[] = $(".headline-2.prettify").map((_, s) => {
        const $s = $(s)
        return $s.text()
    }).toArray()

    const movies = movieData.map((movie, i) => {
        const parts = movie.split(" ")
        const year = parts.pop() ?? "NO YEAR"
        const name = parts.join(" ")
        return { option: name }
    })

    return movies
}
