export const formatTime = time => {
    function fix(num) {
        return num < 10 ? ("0" + num) : num
    }
    let yyyy = time.getFullYear()
    let mm = fix(time.getMonth() + 1)
    let dd = fix(time.getDate())
    let hh = fix(time.getHours())
    let mi = fix(time.getMinutes())
    let ss = fix(time.getSeconds())
    let str = "日一二三四五六"
    let week = str[time.getDay()]
    let _str  = `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss} 周${week}`
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss} 周${week}`
}