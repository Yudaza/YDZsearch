const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'M', url: 'https://developer.mozilla.org/zh-CN/', description: 'MDN'},
    {logo: 'W', url: 'https://www.w3school.com.cn/', description: 'w3c'},
    {logo: 'G', url: 'https://github.com/', description: 'Github'},
    {logo: 'B', url: 'https://www.bootcdn.cn/', description: 'boot'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">
                        ${node.logo}
                    </div>
                    <div class="description">${node.description}</div>
                    <div class="close">
                      <svg class="icon">
                         <use xlink:href="#icon-close"></use>
                      </svg>
                    </div>
                </div> 
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            console.log(hashMap)
        hashMap.splice(index,1)
        render()
        })
    })
}

render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入添加的网址')
        let description = window.prompt('请输入标签名')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({logo: simplifyUrl(url)[0].toUpperCase(), url: url, description: description})
        render()
    })
window.onbeforeunload = () => { //用户关闭之前触发
    const string = JSON.stringify(hashMap)//对象变成字符串储存
    localStorage.setItem('x', string)//在本地存储里设置一个值x，为string
}