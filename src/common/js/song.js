export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function Createsong(musicdata, songkey) {
  console.log(songkey)
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: filterSinger(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albummid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${musicdata.songmid}.m4a?guid=3425323666&vkey=${songkey}&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  const ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })

  return ret.join('/')
}
