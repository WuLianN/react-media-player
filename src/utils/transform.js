import React from "react"

/**
 * @description: 格式化秒数
 * @param {type}
 * @return:
 */
export function formatSec(num) {
  let Tnum = parseInt(num)
  // let H = this.$toZero(Math.floor(num / 3600));
  let M = toZero(Math.floor(Tnum % 3600 / 60))
  let S = toZero(Math.floor(Tnum % 60))
  // return H + ":" + M + ":" + S;
  return M + ':' + S
}

export function toZero(num) {
  if (num <= 9) {
    return '0' + num
  } else {
    return '' + num
  }
}

export function snippetNum(value) {
  if (!value) {
    return ''
  } else {
    if (value > 99999 && value <= 99999999) {
      const result = Math.floor(value / 10000)
      return result + '万'
    } else if (value > 99999999) {
      const result = (value / 100000000)
      const Tresult = result.toString().slice(0, 3)
      return Tresult + '亿'
    } else {
      return value
    }
  }
}

export function snippet15(value) {
  if (!value) {
    return ''
  } else {
    if (value.length > 10) {
      return value.slice(0, 14) + '...'
    } else {
      return value.slice(0, 14)
    }
  }
}

export function snippet17(value) {
  if (!value) {
    return ''
  } else {
    if (value.length > 10) {
      return value.slice(0, 16) + '...'
    } else {
      return value.slice(0, 16)
    }
  }
}

// ['刘德华', '张学友'] -> 刘德华 & 张学友
export function mapArtist(arr) {
  return arr.map((i, index) => <span key={index}>{i.name}{index === arr.length - 1 ? '' : ' & '}</span>)
}