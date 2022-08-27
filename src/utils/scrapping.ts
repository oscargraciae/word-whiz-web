import puppeteer from "puppeteer";
import db from "../../lib/db";


export function scrappage() {
  console.log("SCRAPPING");
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    // await page.goto("https://idiomasic.com/noticias/animales-ingles-lista-200-animales-ingles-espanol/#Vocabulario_de_animales_en_ingles");
    await page.goto("https://www.vocabulario.com.mx/blog/alimentos-en-ingles-vegetales-vocabulario/");
    // const e = await page.waitForSelector('[summary="Insect Vocabulary in Spanish"]')
    // const e = await page.waitForSelector('#content > article > div.post-content > div.entry-content > table:nth-child(22) > tbody')
    const e = await page.waitForSelector('#post-4516 > div > div > figure > table > tbody')

    const res = await page.evaluate((e) => {
        const childrenArray = Array.from(e!.children);

        if (!childrenArray) return [];

        const words = childrenArray.map(child => {
          const english = child?.children[1]?.textContent;
          const spanish = child?.children[0]?.textContent;
          return { english, spanish };
        }) //.filter(word => word.word);
        return words;


    }, e)

    console.log('responses', res);

    const ids = ['62f6a2238bafe52c729faa43', '62f6a2238bafe52c729faa42']
    res.forEach(({ english, spanish }, index) => {
      insertToDB({ wordSpanish: spanish!.toLocaleLowerCase().trim(), wordEnglish: english!.toLocaleLowerCase().trim(), lessonId: ids[index % 2] })
    })

    await browser.close();
    console.log("SCRAPPING FINISHED");
  }).catch(err => {
    console.log(err);
  })
}

function insertToDB({ wordEnglish, wordSpanish, lessonId }: { wordEnglish: string , wordSpanish: string, lessonId: string }) {
  console.log("INSERTING");
  db.vocabulary.create({ data: { wordEnglish, wordSpanish, lessonId, image: null } }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}

// scrappage()


export function getImages() {
  db.vocabulary.findMany({ where: { image: null } }).then(async (res) => {
    // console.log('res', res);
    for (const word of res) {
      console.log('WORD', word.wordEnglish);
      const image = await getImagesByPexels({ word: word.wordEnglish })
      console.log('IMAGE', image);
      if (image) {
        await db.vocabulary.update({ where: { id: word.id }, data: { image } })
      }
    }
})
  // getImagesByPexels({ word: 'duck' })
}

export async function getImagesByPexels({ word }: { word: string }) {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${word}&orientation=landscape&size=medium`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '563492ad6f91700001000001c846fb0210874b95b2dc810664994930'
    }
  })

  const data = await response.json();
  console.log('DATA', data?.photos);
  if (data?.photos.length > 0) {
    const image = data.photos[0]?.src?.medium;
    return image;
  }
  return null // data?.photos[0].src.medium
}

export function scrappImagesByFreepik() {
  console.log("SCRAPPING");

  // findmany vocabulary where image is null
  db.vocabulary.findMany({ where: { image: { isSet: false } }, take: 20 }).then(async (res) => {
    for (const word of res) {
      console.log('WORD', word.wordEnglish);

      puppeteer.launch({ timeout: 99999999 }).then(async browser => {
        const page = await browser.newPage();
        const url = `https://www.freepik.com/search?format=search&query=${word.wordEnglish}&type=photo`
        console.log('URL', url);
        await page.goto(url, { timeout: 99999999 });
        const e: any = await page.waitForSelector('.landscape.loaded', { timeout: 99999999 });

        const image = await page.evaluate((e) => {
          return e.currentSrc;
        }, e)

        console.log('responses', image);

        db.vocabulary.update({where: { id: word.id },  data: { image } }).then((res) => { console.log(res) }).catch((err) => { console.log(err) })

        await browser.close();
        console.log("SCRAPPING FINISHED");
      }).catch(err => {
        console.log(err);
      })
    }
})

  // puppeteer.launch().then(async browser => {
  //   const page = await browser.newPage();
  //   await page.goto("https://www.vocabulario.com.mx/blog/animales-en-ingles-bosque-vocabulario/");
  //   const e = await page.waitForSelector('#post-4518 > div > div > figure > table > tbody')

  //   const res = await page.evaluate((e) => {
  //       const childrenArray = Array.from(e!.children);

  //       if (!childrenArray) return [];

  //       const words = childrenArray.map(child => {
  //         const english = child?.children[1]?.textContent;
  //         const spanish = child?.children[0]?.textContent;
  //         return { english, spanish };
  //       })
  //       return words;


  //   }, e)

  //   console.log('responses', res);

  //   // const ids = ['62eec6c4d960c073170c7e0b', '62f2ab568bafe52c729fa91a']
  //   // res.forEach(({ english, spanish }, index) => {
  //   //   insertToDB({ wordSpanish: spanish!.toLocaleLowerCase(), wordEnglish: english!.toLocaleLowerCase(), lessonId: ids[index % 2] })
  //   // })

  //   await browser.close();
  //   console.log("SCRAPPING FINISHED");
  // }).catch(err => {
  //   console.log(err);
  // })
}



// Your API key: 563492ad6f91700001000001c846fb0210874b95b2dc810664994930

