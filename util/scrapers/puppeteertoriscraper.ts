/*

import puppeteer from "puppeteer"

export async function scrapeTori() {
    const browser = await puppeteer.launch({ headless: "new" })
    const browserPage = await browser.newPage()
    await browserPage.goto(
        'https://www.tori.fi/uusimaa?q=&cg=0&w=1&st=g&ca=18&l=0&md=th')
    await new Promise(r => setTimeout(r, 1000))



    const items = await browserPage.evaluate(() => {
        console.log("sd")
        const foundItems: string[] = []
        const cards = document.querySelectorAll(".item_row_flex")
        for (let card of cards) {
            const desc = card.querySelector(".desc_flex")
            const descText = desc?.querySelector(".ad-details-left")
            const descTitle = descText?.querySelector(".li-title")?.innerHTML
            if (descTitle) foundItems.push(descTitle)
        }
        return foundItems
    })
    await browserPage.close()
    await browser.close()
    return items.slice(0, 3)
} */