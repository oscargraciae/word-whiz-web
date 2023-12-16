import puppeteer from "puppeteer";
import fs from "fs";
import db from "../../lib/db";


export function scrappage() {
  console.log("SCRAPPING");
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    // await page.goto("https://idiomasic.com/noticias/animales-ingles-lista-200-animales-ingles-espanol/#Vocabulario_de_animales_en_ingles");
    // await page.goto("https://www.vocabulario.com.mx/blog/alimentos-en-ingles-vegetales-vocabulario/");
    // const e = await page.waitForSelector('[summary="Insect Vocabulary in Spanish"]')
    // const e = await page.waitForSelector('#content > article > div.post-content > div.entry-content > table:nth-child(22) > tbody')

    // await page.goto("https://www.curso-ingles.com/recursos/vocabulario/human-body");
    // await page.goto("https://www.mansioningles.com/vocabulario40.htm");
    await page.goto("https://www.ingles.com/listas/421798/en-el-hotel");
    const e = await page.waitForSelector('#main-container-video > div.qcDwotA9')

    // #main-container-video > div.qcDwotA9 > div:nth-child(1) > div > div.kdAclosN > a > div.xIhu9M32

    const res = await page.evaluate((e) => {
        const childrenArray = Array.from(e!.children);

        if (!childrenArray) return [];

        const words = childrenArray.map(child => {
          // e.children[0].children[0].children[3].children[0].children[0]
          // const english = child?.children[0]?.textContent;
          // const spanish = child?.children[1]?.textContent;
          const english = child?.children[0].children[3].children[0].children[0].textContent;
          const spanish = child?.children[0].children[3].children[0].children[1].textContent;
          return { english, spanish };
        }) //.filter(word => word.word);
        return words;


    }, e)

    console.log('responses', res);
    console.log('responses', res.length);


    const ids = ['6312a84ab7481ee7df25bc8d','6312a84ab7481ee7df25bc8d']
    let counter = 0;
    res.forEach(({ english, spanish }, index) => {
      if (counter === 2) counter = 0;
      insertToDB({ wordSpanish: spanish!.toLocaleLowerCase().trim(), wordEnglish: english!.toLocaleLowerCase().trim(), lessonId: ids[counter] })
      counter++
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

function saveCookies(cookies: any) {
  fs.writeFile('cookies.json', JSON.stringify(cookies), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}

function loginCookies() {
  const readCookies = fs.readFileSync('cookies.json', 'utf8');
  return JSON.parse(readCookies)
}

export function scrappagNETFLIX() {
  console.log("SCRAPPING");
  puppeteer.launch({ ignoreHTTPSErrors: true, headless: false }).then(async browser => {
    let page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 980 });
    const cookies = await loginCookies();
    await page.setCookie(...cookies);
    // await page.goto("https://www.netflix.com/mx-en/login");

    // const loginInput = await page.waitForSelector('#id_userLoginId');
    // const passwordInput = await page.waitForSelector('#id_password');

    // await loginInput!.type('oscar.graciae@gmail.com')
    // await passwordInput!.type('es8tEVLqArFQ5bX')

    // const loginButton = await page.waitForSelector('.btn login-button btn-submit btn-small');
    // await page.click('#appMountPoint > div > div.login-body > div > div > div.hybrid-login-form-main > form > button')
    // await page.waitForNavigation({ waitUntil: 'networkidle0' })

    // saveCookies(await page.cookies());

    // await page.waitForNavigation()

    // page = await browser.newPage();
    // await page.goto("https://www.netflix.com/browse/genre/83");

    // await page.goto("https://www.netflix.com/browse/m/popular-titles");
    // await page.click('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a')


    await page.goto("https://www.netflix.com/latest");
    await page.click('#appMountPoint > div > div > div:nth-child(1) > div.bd.dark-background > div.profiles-gate-container > div > div > ul > li:nth-child(1) > div > a')
    const e = await page.waitForSelector('#row-1 .sliderContent')

    const movieList = await e?.$$('#row-1 .sliderContent .slider-item')
    console.log('movieList', movieList)

    const urls: string[] = []
    if (movieList) {
      for (const content of movieList) {
        const url = await content.$('.title-card > div.ptrack-content > a')
        if (url) {
          const urlText = await page.evaluate((url: any) => url?.href, url)
          const title = await page.evaluate((url: any) => url.getAttribute('aria-label'), url)
          console.log('urlText', urlText, title)
          urls.push(urlText)
        }
      }
    }

    // const res = await page.evaluate((e) => {
    //     const childrenArray = Array.from(e!.children);

    //     if (!childrenArray) return [];

    //     const words = childrenArray.map(child => {
    //       const movie = child.children[0].children[0].children[0].children[0]// .attributes[0].value;

    //       const id = movie?.attributes[0].value.split('/')[2].split('?')[0];
    //       const url = movie?.attributes[0].value;
    //       const title = movie?.attributes[2].value;
    //       const image = movie?.children[0].children[0].attributes[1].value;

    //       console.log('id=======', id)
    //       // await page.goto(`https://www.netflix.com/title/${id}`);

    //       // const description = page.waitForSelector('#appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child(1) > div > div > div.previewModal--detailsMetadata-left > p > div')

    //       // console.log('child elemento====>', )
    //       // e.children[0].children[0].children[3].children[0].children[0]
    //       // const english = child?.children[0]?.textContent;
    //       // const spanish = child?.children[1]?.textContent;
    //       // const english = child?.children[0].children[3].children[0].children[0].textContent;
    //       // const spanish = child?.children[0].children[3].children[0].children[1].textContent;
    //       return { id, url, title, image };
    //     }) //.filter(word => word.word);
    //     return words;


    // }, e)

    // console.log('responses', res);
    // console.log('responses', res.length);

    // await browser.close();
    console.log("SCRAPPING FINISHED");
  }).catch(err => {
    console.log(err);
  })
}
