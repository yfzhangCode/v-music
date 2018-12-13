// 引入axios
import axios from 'axios';
// qs 
import qs from 'qs';

import config from './config/config';

let base = '/api';

// 获取 recommend 数据

export const getRecommendData = parmas => {
    parmas = config.Param;
    return axios.get(`${base}musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg`, qs.stringify(parmas));
}
