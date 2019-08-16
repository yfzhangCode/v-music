export const Param = {
  g_tk: 5381,
  format: 'json',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}

export const options = {
  param: 'jsonpCallback'
}

let baseURl = ''
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  baseURl = ''
} 

if (process.env.NODE_ENV === 'production') {
  baseURl = 'https://www.dokuakua.com'
}

export default baseURl

export const ERR_OK = 0

