const fs = require('fs');
const https = require('https');
const path = require('path');

const imageUrls = {
  'customer-1.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVUE7s7pc8XKPJEgAB1X2hMQqwi6hRxtMAkp9mtMgMmarf5ffIz1d7MOS51UOF0uywD8agzgThaLR10p7wBz2QMKcyql7zt2AuPi5UoKcaH2XJEuza3klnM1kO0xcDhpLWLGOSgI-TrMeYdirO-m9L8tY6m1M-s4XP3Ov1bg7_lKnn6vWvFE53irngQO-sIrXa890hBKTfssjEJqAYq3xHTEhMrP3WFGnT3fwIgdZZF46s1j0opgPtyLF0a74u4Yu8vtnxCoTnTLE',
  'customer-2.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2MwjHw7mtE4JQbQnyJZmhBd_p7uBvRlu0fINvOL3OKIhDdsGi75uzJ_7e_7khH0yJRxrZo-aC8077qKht-EsIlDPiKqCO785HV2uDuRZyD8L0WEwe2cLSZmLTxxp3bhKaJH_jVbJL14r_BHcTc7xXfnzmSyKIlm0P2JuiEL99t51Q89htvSCZuTgSe3gBt3L-jPHw1wvLCZHN9KkM9bOo4JUo83rfAT22oz7Ix4txWty_cO5PQMR1qzt7AwaCIeQmhKrGGXyjc_A',
  'customer-3.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuorG4zK4-Qt1L4BuZ-5DMsVxAhfwGgoEm2vT4eMWzInNCO_oZwhiCklnxEpy-ImLMQMxmYVojzROp09JvVTv_VZDK21i08RUfBU1n7ZYqrNlaKrHt8CE6OeewD5EaVoCvizGPrDsvxGEMB_sNkiE0wPzux5vMMEbki4Lr9LQ6hzhcMoxkBxBJcUFzdH6igRqHVREv8GGHsSzbIykiouVAxJvyfGjdfae1uWP3uxPgyejtt8BvzKpKLuk2SXKizUX0HuykzVLuND8',
  'hero.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYpwbfYwfzprwL-6tQkrgeFRF9u17xRbocRPmDNxe3-a_RMjVaqcjUGsSt9GvZLYjJvsA57iXNMW4bPDK1HMDLuR4q4OQrnN_YO_rp_rkYWZ5D0WuqsNQK2khR5Vb2v3hwITEe7Ny4uRA4GOitjjCmSpmrBH2vKe708du2rwCOkYHye25LEauV6r87rsL75XXoJcvdeUXfjIesEk0mOJAitDSx7ULnEHHvba5dx2p_r5mK2G8CQ_gf3tOrilp55t5yvNvXU5VHGx8',
  'menu-cold-brew.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdn2Y4K6kmyKGHJcZS-ptIYtdIfI40TKlIVWwCsStJQQbIhtdySXSQkpTDNqowroAuSfRJh-87rukHw0XrvvYcKJsUB36iZuhwflhGns6gjvWvOPvIRXkfCond9Gz2KNc4Yc7EsYo9NANgK9Pv7yPphpHBvRwKKhh7pWBdtBUKCRD4ht2S6PRV9QINI-iGmrM7cEj4Up9MmtdSvWCwuvUFHsGT6tJK7OVQBHxGMNmtgBnAKLPdrXGx3f2iZRsqCJadB6vpjRXNr_Q',
  'menu-latte.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7a-Lan1QdixEVfDKKjfFZbbz6ONlq4ewGC8xXWVPsaX3q3Mm4VWFhbL9eVDoBZ6irRwA4JMRT7uKfHp-sE8SH2-aMIU5p6IA4SPkhp9ufmnnuKPEGsYPMgwreLUk8BhvwQCNHnjlVbaqdcFb3CfLYE9vmuiGrdpl7sB57CDzeGuv7QtdYdabN59LQSSECjuzK2oEuaRKTLCw3Gw6qrCTUSFvl4W8g6HF7BDmSMaCcedRxed8YqJqTTtxw62DbSQoyYT5UNGm8Nek',
  'menu-matcha.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7mUjgjqCJu7XCjHlpsVqESWyAyGKPxT4FLIw1UYMRHgC3LbfC8S9npjfAEGPpsChBoLKWEP8Sutbdn7bc3EgEkGJqFqlZZonatVehA4glfG82nUwstkytSdBYYcHGqMbYUBR3jqWEiuGL6grCEI16dKgKdbexihyt6NVCR1JVlEiMP3S66Qan_Rcj7Jk0A9iZ4QoVh97z0kwBhdhazSHhGFJo_WLcSGfFu2mE_LjQLyw1sfSE1m24FEbUJGWpBX0pphyQmE4K8oA',
  'sustainability.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPzQM4geq0tqYzxfYBeHrwfytFM4MeUIML3sdHRW0Va3whm4HS14cDBj8R4nZ0qtopFozxHDvrEVpjaJqNAq6FQxJivi-35iJ5rMnO9zRv9BDrqgy3cawdu6W0AzwtlTCmI-IlTlRtpGTdzxFCaTWitASqjpp5boNWBsGCnKjMiBjjyM8CHRvr5vpIVyJC-x6nk3elDGliEfHw6j4Wp4UxyJ3eVSw3igoixHLYyzp9ST7LCZ6Kq3_z2XXSKSD0pPOifib8UdFuM4A',
  'product-1.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzPfb2qZ22ULwLAh6WgO5KvBkQAIUdb_CekaEoRWq7QAgHo4m-D4ANynjHSzlcOV8XK8rfvouB91fnG7ocKGRYwpPQixAq9frKrp_hqn4JCsN9WTqAFmBCg6th9V4Lsv5SPnAaMGD-eNKS-N35NX1W3j9OWIZo8JAKnWkRdBAvzI_Iwhi9HVcxjfPdp32MR9ftesGGwBpQKEghWWWhHMZTyMqlRU5JLiwL-6H5aMrzvtgrsyoyoYwQmXp2rgsnrfQGaLioH2cDVr0',
  'product-2.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5teSNwa_f2ry_2lBxKXkcfoCjUcv4mh35iv2ty-edNOKEryMKQeh1JWKBe98tKTSuifuOA39xZm0PdC3d6rmLTWpwxWv5De6lUcCipno1k6uGxnr4VZ50byZPrvQMlyFm5sjScp1dJLU4EeLc3_ErhZDjzgPe28hfQxBtmbxupGMLJ6UVhehkoNk-GRa1nWIlXaEhIO9o0qdySOL1uyi9HANCcqriN42GMAMt2S9CmV5WHjV7V2LzhODEYxT87ZWJKC-OP1tZQLI',
  'product-3.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgeffRgSzkldRmAJFhymLRN0sJ_CqTiwvFnNV1PwKmjcAwCg8EJXsd1_71FLCcaXJf0OLf-akvWKQ-mpwvnQLM6uJI8u1LBYFSiYeYOpiGm2EcG5mVL-LToLJlhZnUo6lAGxFZDzQxcwdYrxY3-AyFOY3Cdf6NqJV9fd4FIUHNQVPyYFurd8TKePNumbpgqbnMIk4VHD6P_OcaMCOYfGwPVU3sEYEPi3chFD4Uve5PXMZ2cj8X3u5l7SOkkXdgJ4bbgtFM2QebjeA',
  'product-4.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrWsZ1reNJSe4V8658mxG8L4MfB9DkSU7RbvjRpARZnv2GyjeZ-XNQIpZP6BfrDq2TgaLvbzk2PUqHtP-732o00QKIbjwtzK8LTWAFZ-Ile-wweKeBfbW3wO2qdX7UkLh3qgmf9xHkzhSG8bDXXj41CKrB-31RtsY0nWErswZSXh_80YoqKh0y-SHhMtVtRfCTeGnhZyPrCapF0Utj9DJ2DiXMX_5B02-9eSL5wa_j2TCYldZRigjp0Y6BzS9lGFLxe40KDD4nzsc',
  'testimonial-1.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuClvrlpQ5gBvzEZYx1Sp5Z8rmoAByN01iJNtKUHmV_lrWBAUCJMl1sGvxbdKEgHpCT3HUHHcA1yAm2ULZk5UmXc2321IzojPpAoFciD5I3LxpvtPS7DnW29oTe2OexNzOT-kD_GZQDF0CGWcbGFJskXoifjZ44Qu1l1Y7QyRH1auUdj4oqlKih5cALTn_lb6B-BRi7Zoit4U3L13cBM2WdkxVs_KVFQwZJDPuZ_mkANLtmziRX0vpZpneOm8wDKoCo9n7Xy6QMPqF4',
  'testimonial-2.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbRGH1NKNqTxPa0dzQW8M7rjBlpb0LsQFPatM4QyZDNaiU_u7UDnGFt79Qb0M962nuNpqR3iDDo08YWhlLtKdpZXWSw7imZ_CnaP4wxhmpkNYUPVxckr4LkegCfXwctQL6j7zvWiPsd0MO9vWFl7B01AbnRWMyET2E5cT0fmgcDyts7IBsDkLJN0IhfD-1_ZRM65mnkjEH5tg8PBM5L6Dkpc9eNVswKe0AXF8Q_l0TksaeEDza0AyezjY_uDD4qaROspD4Dp7dUKw',
  'testimonial-3.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVbexlMeZjYHW-jVFLY73kQHbsp0AM95cc4VUstnmF0TF4ldbnoMaraa0UVO9TauSpPPDoq7LjXBOtuGOKn2HdQ52cP_oDbf5G5hqrd2qdgl0_gN-9rXcet_zCh2uGXPnjNWwmtQNNZB_MQZ3jkM34f_X3jDCnBrgPpFuhc4J_o9D6hRbqyurF7FKcSACR8GyXIgWOWRE_XfkGIFi1CFjS2PmHzXK7gPWYBdSNE8L4bzvil1utsEYPAB-t0dBunviL6kJLNYNIMFw',
  'book-table.jpg': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPXw9A4q9YfO6kE8pgRpUiGdKMlNx04c2qwDliC2scHsTrMrVVLvjzHA4KW1isLKREtlc3SOt7pIHeetj4uyrIN3Y2O1MlGFxFKR64O_iXoZ0lXMLfkRN_LsbFVD0PG8Mwm4CPCe1QioeNzl65dDd8oKeO6A7vIcP-cYAlrQulYqBDzbzqQZj5RjqCfbjbAS8vyc_LhjpsHoth-EFdvSTvnpRBV4lmKx2KDr4Gj1YwMvBx9RQIi2-Kbov8R762UsyaL5LpFYRlI_w'
};

const outputDir = path.join(__dirname, 'public', 'images', 'homepage');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function downloadAll() {
  for (const [filename, url] of Object.entries(imageUrls)) {
    console.log(`Downloading ${filename}...`);
    await download(url, path.join(outputDir, filename));
  }
  console.log('All downloads complete.');
}

downloadAll();
