// ─────────────────────────────────────────────────────────────
//  ဒီ file တစ်ခုတည်းကို ပြင်ရုံနဲ့ website ထဲက စာသား၊ ရက်စွဲ၊ နေရာ၊ ပုံ
//  အားလုံး ပြောင်းသွားပါမယ်။
// ─────────────────────────────────────────────────────────────

export const couple = {
  first: 'Naing',
  second: 'Swe',
}

// ပွဲရက်စွဲ / အချိန် (countdown အတွက်) — မြန်မာစံတော်ချိန် +06:30
export const eventDate = '2026-11-22T08:00:00+06:30'
export const dateLabel = '22 . 11 . 2026'
export const dateLong = 'Sunday, 22 November 2026'
export const dateMm = '၁၃၈၈ ခုနှစ်၊ တန်ဆောင်မုန်းလဆန်း (၁၃) ရက် · တနင်္ဂနွေနေ့'

export const hero = {
  eyebrow: 'Wedding Invitation',
}

export const invitation = {
  title: 'With joy in our hearts',
  message:
    'ကျွန်တော်/ကျွန်မတို့နှစ်ဦး၏ မင်္ဂလာပွဲသို့ ကြွရောက်ချီးမြှင့်ပေးပါရန် လေးစားစွာ ဖိတ်ကြားအပ်ပါသည်။',
  note: 'Your presence would mean the world to us.',
}

// ပုံ ၉ ပုံ — public/photos ထဲမှာ ပုံထည့်ပြီး ဒီမှာ နာမည်ပြောင်းပါ (jpg / webp / png)
export const photos = [
  { src: '/photos/photo-1.jpg', alt: 'Photo 1', pos: 'center 25%' },
  { src: '/photos/photo-2.jpg', alt: 'Photo 2', pos: 'center 25%' },
  { src: '/photos/photo-6.jpg', alt: 'Photo 3', pos: 'center 20%' },
  { src: '/photos/photo-7.jpg', alt: 'Photo 4', pos: 'center 20%' },
  { src: '/photos/photo-3.jpg', alt: 'Photo 5', pos: 'center 22%' },
  { src: '/photos/photo-8.jpg', alt: 'Photo 6', pos: 'center 20%' },
  { src: '/photos/photo-4.jpg', alt: 'Photo 7', pos: 'center 18%' },
  { src: '/photos/photo-5.jpg', alt: 'Photo 8', pos: 'center 20%' },
  { src: '/photos/photo-9.jpg', alt: 'Photo 9', pos: 'center 22%' },
  { src: '/photos/photo-10.jpg', alt: 'Photo 10', pos: 'center 22%' },
  { src: '/photos/photo-11.jpg', alt: 'Photo 11', pos: 'center 38%' },
  { src: '/photos/photo-12.jpg', alt: 'Photo 12', pos: 'center 20%' },
  { src: '/photos/photo-13.jpg', alt: 'Photo 13', pos: '40% 30%' },
]

// မင်္ဂလာနေရာ
export const venue = {
  time: '8:00 AM – 12:00 PM',
  timeMm: 'နံနက် (၈:၀၀) နာရီ မှ နေ့လယ် (၁၂:၀၀) နာရီ အထိ',
  place: 'မြင့်မင်္ဂလာခန်းမ',
  address:
    'လမ်းညွှန် — YBS 8, 9, 134 ကားများစီး၍ ကွမ်အပ်သားမင်းသားလမ်း “မြေနီမှတ်တိုင်” တွင် ဆင်းပါ။',
  // Google Maps မှာ ခန်းမကိုရှာပြီး Share link ကို ဒီမှာ အစားထိုးပါ
  mapUrl:
    'https://www.google.com/maps/place/Myint+-+Wedding+Hall/@16.8443533,96.271041,20.16z/data=!4m14!1m7!3m6!1s0x30c18d173e1469c7:0xa92e6b94ff4a5a3c!2sShwe+Than+Lwin+Home+For+Aged!8m2!3d16.8449623!4d96.2678522!16s%2Fg%2F11g9mh65bf!3m5!1s0x30c18d2647468c43:0xb691f0827075cbc1!8m2!3d16.8444606!4d96.2711344!16s%2Fg%2F11j139gqc8?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D',
}

export const closing = {
  title: 'See you there',
  message: 'သင်တို့၏ ကြွရောက်ခြင်းသည် ကျွန်တော်/ကျွန်မတို့အတွက် အကောင်းဆုံးလက်ဆောင်ပါ။',
}
