
let s ="xbxbcbxcxdemegdehijhklit";
let uniqStr = solv(s);
let out = 0;
for(let i=0;i<uniqStr.length;i++){
    let len = uniqStr[i].length;
    out+=len*len;
}
return out;

function solv(s)
{
    let len = s.length;
    let substr = "";
    let uniqueStrs = [];

    if (len == 0) return 0;
    
    let endPosition = Array(26).fill(-1);
    for (let i = len - 1; i >= 0; --i) {
        if (endPosition[s[i].charCodeAt() - 'a'.charCodeAt()] == -1) {
            endPosition[s[i].charCodeAt() - 'a'.charCodeAt()] = i;
        }
    }
    let minimumPoint = -1;
    for (let i = 0; i < len; ++i) {
        let lastPoint = endPosition[s[i].charCodeAt() - 'a'.charCodeAt()];
        minimumPoint = Math.max(minimumPoint, lastPoint);
        if (i == minimumPoint) {
            substr += s[i];
            uniqueStrs.push(substr);
            minimumPoint = -1;
            substr = "";
        }
        else substr += s[i];
    }
    return uniqueStrs;
}
