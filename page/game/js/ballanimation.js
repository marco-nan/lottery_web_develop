/**
 */
var x,y,n=0,ny=0,rotINT,rotYINT

function rotateYDIV()
{
    // y = document.getElementById('LotteryResultBox');
    y = $('#LotteryResultBox')[0];
    if(!y){
        y = $("#lotterResult")[0]
        if(!y){
            return;
        }
    }
    clearInterval(rotYINT)
    rotYINT=setInterval("startYRotate()",1)
}

function startYRotate()
{
    ny=ny+1
    y.style.transform="rotateX(" + ny + "deg)"
    y.style.webkitTransform="rotateX(" + ny + "deg)"
    y.style.OTransform="rotateX(" + ny + "deg)"
    y.style.MozTransform="rotateX(" + ny + "deg)"
    if (ny>=360)
    {
        clearInterval(rotYINT)
        if (ny>=360){ny=0}
    }
}
