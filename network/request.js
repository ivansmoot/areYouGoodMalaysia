import axios from 'axios'

export function request (config) {
  const instance1 = axios.create({
    // baseURL: '/apis'
    baseURL: 'https://ad4e810f.ngrok.io'
  })
  return instance1(config)
}

// 这是项目的网络配置，引入了axios，鱿鱼丝推荐，必属精品
// 暴露出request，这里的/apis在vue.config.js暴露出
