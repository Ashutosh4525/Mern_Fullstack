function f1(title, imgSrc ){
    document.getElementById("fltitle").innerHTML=title;
    document.getElementById("flimg").src=imgSrc;
    // document.getElementById("fltxt").innerHTML=txt;
    document.getElementById("float1").style.display="block";
    // document.getElementById("section2").style.overflow="hidden";
    document.body.classList.add("flopen");
    // document.getElementById("float1").style.overflowX="hidden";
    
    
}
function f2(){
   document.getElementById("float1").style.display="none";
   document.body.classList.remove("flopen");
}