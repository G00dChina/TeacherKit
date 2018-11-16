function toggleMenu(objID) {
if (!document.getElementById) return;
var ob = document.getElementById(objID).style;
ob.display = (ob.display == 'block')?'none': 'block';
}

function toggleMenu2(objID) {
if (!document.getElementById) return;
var ob = document.getElementById(objID).style;
ob.display = (ob.display == 'block')?'none': 'block';
}

function toggle(imagename,src1,src2){      
    if(document.images && document.images[imagename]){
        image1=new Image;
        image1.src=src1;
        if(document.images[imagename].src != image1.src){
            document.images[imagename].src = image1.src
        }
        else{
            document.images[imagename].src=src2
        }
    }
}