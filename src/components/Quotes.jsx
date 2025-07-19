import React, { useEffect, useState } from 'react'
import blueBg from '../assets/blue-bg.jpg'
import blueClouds from '../assets/blue-clouds.jpg'
import lightBg from '../assets/light-bg.jpg'
import rainBg from '../assets/rain-bg.jpg'
import rainWindow from '../assets/rain-window-bg.jpg'
import stairsBg from '../assets/stairs-mountain-bg.jpg'
import turkeyBg from '../assets/turkey-bg.jpg'
import winterBg from '../assets/winter-ng.webp'
import clouds from '../assets/coluds.jpg'
import mountain from '../assets/mountain-bg.jpg'
import raintraffic from '../assets/rain-traffic.jpg'
import space from '../assets/space-bg.jpg'
import font from '../assets/font-bg.jpg'

const quotes = [
    { text: "Ilmni boshi mashaqqat , oxiri bitmas foyda-yu manfaatdir", author: "Omad kaliting yuzinchi kitobi" },
    { text: "Qalb insonning borliq olamidir", author: "Qalb iffati" },
    { text: "Ko'ngil og'rigan bolsa , ham kongil og'ritma ", author: "Ishqga oshiqman" },
    { text: "Yashamoq degani esa dunyoga , hayotga va o'limga konikmoq deganidir", author: "Ishqga oshiqman" },
    { text: "Biroq dunyoga maftun bolgan ko'nglim emas , blki unga oshiq nafsimdir.", author: "Ishqga oshiqman" },
    { text: "Inson ko'rmaganiga oshiq bo'ladi , ko'rganiga esa muxlis ", author: "Ishqga oshiqman" },
    { text: "Muvaffaqiyat yolidagi eng katta tosiq muvaffaqiyatsizlik emas , balki zerikishdir .", author: "Atom Odatlari" },
    { text: "Odat+Ongli mashgulot=yuksak maxorat ", author: "Atom Odatlari" },
    { text: "Sog'inch — Ruh bora oladigan joyga tananing bora olmasligidir....", author: "Kitob" },
    { text: "Sabr bu qalbingini yorishtiradigan otashdir", author: "Barchasi senga atalgan" },
    { text: "Axloq xayodir xayo esa iffatdir", author: "Qalb iffati" },
    { text: "Agar baxtli bolmoqchi bolsangiz , boshqalarni baxtli qiling", author: "Kitob" },
    { text: "Taffakur-bu bir g'oya, fikr yoki haqiqatni olish va uni chuqur tahli qilishdir", author: "Gayriixtiyoriy ong mojizasi" },
    { text: "Ajaldan kora koproq , rizqing seni taqib qiladi", author: "Omad kaliting yuzinchi kitobi" },
    { text: "Eslash uchun unutish kerak-ku!", author: "Ishqga oshiqman" },
]
const images = [
    blueBg, blueClouds, lightBg, rainBg, rainWindow, stairsBg, turkeyBg, winterBg, clouds, mountain, space, font, raintraffic
]

const Quotes = () => { 
    useEffect(() => {
        getRandom()
    }, [])  //ilk marta ekranga chiqgani uchun (mount) uchun
    const [quote, setQuote] = useState({}); 
    const [bgImages, setBgimages] = useState({});

    const getRandom = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length) 
        setQuote(quotes[randomIndex]);
        const randomImages = Math.floor(Math.random() * images.length)
        setBgimages(images[randomImages]);
    }

    return (
        <main>
            <section className='container max-w-7xl mx-auto px-5 py-8 bg-[url] bg-cover bg-center bg-no-repeat min-h-screen min-w-screen' style={{ backgroundImage: `url(${bgImages})` }}>
                <div className=" w-[100%] h-[400px] max-w-3xl bg-grey-500 bg-opacity-50 backdrop-blur-md rounded-xl m-auto mt-[130px] backdrop-saturate-125">
                    <div className='grid'>
                        <p className='text-white text-[35px] text-center font-mono mt-[90px]'>{quote.text}</p>
                        <p className='text-white text-[20px] text-right mr-[50px] mt-[30px]'><span className='bg-white w-[30px] h-[1px] inline-block mb-[5px] mr-[5px]'></span>{quote.author}</p>
                        <button onClick={getRandom} className='m-auto mt-[30px] border-none bg-gray-600 text-white w-[200px] h-[50px] text-[20px] rounded-[10px]'>Generate</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Quotes