// 获取 recommend 数据
import axios from 'axios'
import jsonp from '../common/js/jsonp' // 引入jsonp

import { Param, options } from './config/config' // 引入config.js

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, Param, { // es6的assign将commonParams和
    uin: 0, // 之后的对象合并为一起，放在
    platform: 'h5', // 前面的{}之中。
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

// 热门歌单推荐
export function getCatlist() {
  const url = '/api/getCatlist'
  const data = Object.assign({}, Param, {
    platform: 'yqq',
    uni: 0,
    needNewCode: 0,
    hostUin: 0,
    rnd: Math.random(),
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌手列表

export function getSingers() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, Param, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    platform: 'yqq',
    notice: 0,
    needNewCode: 0,
    format: 'jsonp'
  })

  return jsonp(url, data, options)
}

// 获取歌手详情信息
export function getSingerDetail(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, Param, {
    platform: 'yqq',
    needNewCode: 0,
    ct: 24,
    singermid: singerid,
    order: 'listen',
    begin: 0,
    num: 10
  })

  return jsonp(url, data, options)
}

// 获取播放歌曲的vkey

export function getMusic(songmid) {
  const url = '/api/getMusic'

  const data = Object.assign({}, Param, {
    loginUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    guid: 3425323666,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}
