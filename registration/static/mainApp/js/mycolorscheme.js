function GetHSLcolor(color){
    var r = color.r;
    var g = color.g;
    var b = color.b;
    var min = Math.min(r,g,b);
    var max = Math.max(r,g,b);
    var del_max = max - min;
    var L = (max+min)/2;
    if (del_max == 0){
        var H=0;
        var S=0;
    }
    else {
        if (L<0.5) {S=del_max/(max+min);}
        else {S=del_max/(2-max-min);}
        var del_R = ( ( ( max - r) / 6 ) + ( del_max / 2 ) ) / del_max;
        var del_G = ( ( ( max - g ) / 6 ) + ( del_max / 2 ) ) / del_max;
        var del_B = ( ( ( max - b ) / 6 ) + ( del_max / 2 ) ) / del_max;
        if (r==max) {H=del_B-del_G;}
        else if ( g == max ) {H = ( 1 / 3 ) + del_R - del_B;}
        else if ( b == max ) {H = ( 2 / 3 ) + del_G - del_R;}
        if ( H < 0 ) {H += 1;}
        if ( H > 1 ) {H -= 1;}
        }
    var result = {};
    result.H = Math.floor(H*360);
    result.S = Math.floor(S*100);
    result.L = Math.floor(L*100);
    result.col = "hsl(" + result.H + "," + result.S + "%," + result.L + "%)";
    return result;

};

function HSVTORGB(H,S,L){
    H=H/360;
    S=S/100;
    L=L/100;
    var result={};
    if ( S == 0 ){
   result.R = Math.floor(L * 255);
   result.G = Math.floor(L * 255);
   result.B = Math.floor(L * 255);
    }
    else
    {  
        if ( L < 0.5 ) {var var_2 = L * ( 1 + S );}
        else           {var var_2 = ( L + S ) - ( S * L );}
        var var_1 = 2 * L - var_2;
        result.R = Math.floor(255 * Hue_2_RGB( var_1, var_2, H + ( 1 / 3 ) ));
        result.G = Math.floor(255 * Hue_2_RGB( var_1, var_2, H ));
        result.B = Math.floor(255 * Hue_2_RGB( var_1, var_2, H - ( 1 / 3 ) ));
    }
    return(result);
};
function Hue_2_RGB( v1, v2, vH ){
   if ( vH < 0 ) vH += 1
   if( vH > 1 ) vH -= 1
   if ( ( 6 * vH ) < 1 ) return ( v1 + ( v2 - v1 ) * 6 * vH )
   if ( ( 2 * vH ) < 1 ) return ( v2 )
   if ( ( 3 * vH ) < 2 ) return ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )
   return ( v1 )
};

function global(kol,color1,color2,color3,color4){
    var result1=HSVTORGB(color1.H,color1.S,color1.L);
    var result2=HSVTORGB(color2.H,color2.S,color2.L);
    globalcolors={};
    globalcolors.r1=result1.R;
    globalcolors.g1=result1.G;
    globalcolors.b1=result1.B;
    globalcolors.r2=result2.R;
    globalcolors.g2=result2.G;
    globalcolors.b2=result2.B;
    if (kol==2){
        globalcolors.r3=-1;
        globalcolors.g3=-1;
        globalcolors.b3=-1;
        globalcolors.r4=-1;
        globalcolors.g4=-1;
        globalcolors.b4=-1;
        }
    else if (kol==3){
        var result3=HSVTORGB(color3.H,color3.S,color3.L);
        globalcolors.r3=result3.R;
        globalcolors.g3=result3.G;
        globalcolors.b3=result3.B;
        globalcolors.r4=-1;
        globalcolors.g4=-1;
        globalcolors.b4=-1;
        }
    else if (kol==4){
        var result4=HSVTORGB(color4.H,color4.S,color4.L);
        var result3=HSVTORGB(color3.H,color3.S,color3.L);
        globalcolors.r3=result3.R;
        globalcolors.g3=result3.G;
        globalcolors.b3=result3.B;
        globalcolors.r4=result4.R;
        globalcolors.g4=result4.G;
        globalcolors.b4=result4.B;
    }
};
function invert(){
        var color = $('#color-block').wheelColorPicker('getColor');
        var color1=GetHSLcolor(color);
        var color2 = {}; 
        for (let key in color1) {
        color2[key] = color1[key];}
        if (color1.H<180) {color2.H=color1.H+180;}
        else {color2.H=color1.H-180;}
        color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
        document.getElementById("color1").style.background = color1.col;
        document.getElementById("color2").style.background = color2.col;
        document.getElementById("color3").style.background = "#fff";
        document.getElementById("color4").style.background = "#fff";
        var kol=2;
        global(kol,color1,color2);
  };

function triade(){
        var color = $('#color-block').wheelColorPicker('getColor');
        var color1=GetHSLcolor(color);
        var color2 = {}; 
        var color3 = {}; 
        for (let key in color1) {
            color2[key] = color1[key];
            color3[key] = color1[key];
        }
        if (color1.H+120>359) {
            color2.H=color1.H-240;
            color3.H=color1.H-120;
        }
        else if (color1.H-120<0) { 
            color2.H=color1.H+120;
            color3.H=color1.H+240;
        }
        else {
            color2.H=color1.H+120;
            color3.H=color1.H-120;
        }
        color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
        color3.col = "hsl(" + color3.H + "," + color3.S + "%," + color3.L + "%)";
        document.getElementById("color1").style.background = color1.col;
        document.getElementById("color2").style.background = color2.col;
        document.getElementById("color3").style.background = color3.col;
        document.getElementById("color4").style.background = "#fff";
        var kol=3;
        global(kol,color1,color2,color3);
  };

  function tetrade(){
    var color = $('#color-block').wheelColorPicker('getColor');
        var color1=GetHSLcolor(color);
        var color2 = {}; 
        var color3 = {}; 
        var color4 = {};
        for (let key in color1) {
            color2[key] = color1[key];
            color3[key] = color1[key];
            color4[key] = color1[key];
        }
        color2.H=color1.H+60;
        color3.H=color1.H+180;
        color4.H=color2.H+180;
        if (color2.H>359) {color2.H=color2.H-360;}
        if (color3.H>359) {color3.H=color3.H-360;}
        if (color4.H>359) {color4.H=color4.H-360;}
        color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
        color3.col = "hsl(" + color3.H + "," + color3.S + "%," + color3.L + "%)";
        color4.col = "hsl(" + color4.H + "," + color4.S + "%," + color4.L + "%)";
        document.getElementById("color1").style.background = color1.col;
        document.getElementById("color2").style.background = color2.col;
        document.getElementById("color3").style.background = color3.col;
        document.getElementById("color4").style.background = color4.col;
        var kol=4;
        global(kol,color1,color2,color3,color4);

};

function squaree(){
    var color = $('#color-block').wheelColorPicker('getColor');
        var color1=GetHSLcolor(color);
        var color2 = {}; 
        var color3 = {}; 
        var color4 = {};
        for (let key in color1) {
            color2[key] = color1[key];
            color3[key] = color1[key];
            color4[key] = color1[key];
        }
        if (color1.H+90>359) {
            color2.H=color1.H-270;
            color3.H=color2.H+90;
            color4.H=color3.H+90;
        }
        else if (color1.H+180>359){
            color2.H=color1.H+90;
            color3.H=color2.H-270;
            color4.H=color3.H+90;
        }
        else if (color1.H+270>359){
            color2.H=color1.H+90;
            color3.H=color2.H+90;
            color4.H=color3.H-270;
        }
        else {
            color2.H=color1.H+90;
            color3.H=color2.H+90;
            color4.H=color3.H+90;
        }
        color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
        color3.col = "hsl(" + color3.H + "," + color3.S + "%," + color3.L + "%)";
        color4.col = "hsl(" + color4.H + "," + color4.S + "%," + color4.L + "%)";
        document.getElementById("color1").style.background = color1.col;
        document.getElementById("color2").style.background = color2.col;
        document.getElementById("color3").style.background = color3.col;
        document.getElementById("color4").style.background = color4.col;
        var kol=4;
        global(kol,color1,color2,color3,color4);

};

function analogy(){
    var color = $('#color-block').wheelColorPicker('getColor');
    var color1=GetHSLcolor(color);
    var color2 = {}; 
    var color3 = {}; 
    for (let key in color1) {
        color2[key] = color1[key];
        color3[key] = color1[key];
    }
    if (color1.H+50>359) {
        color2.H=color1.H-310;
        color3.H=color1.H-50;
    }
    else if (color1.H-50<0) { 
        color2.H=color1.H+310;
        color3.H=color1.H+50;
    }
    else {
        color2.H=color1.H+50;
        color3.H=color1.H-50;
    }
    color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
    color3.col = "hsl(" + color3.H + "," + color3.S + "%," + color3.L + "%)";
    document.getElementById("color1").style.background = color1.col;
    document.getElementById("color2").style.background = color2.col;
    document.getElementById("color3").style.background = color3.col;
    document.getElementById("color4").style.background = "#fff";
    var kol=3;
    global(kol,color1,color2,color3);
};

function split(){
    var color = $('#color-block').wheelColorPicker('getColor');
        var color1=GetHSLcolor(color);
        var color2 = {}; 
        var color3 = {}; 
        for (let key in color1) {
            color2[key] = color1[key];
            color3[key] = color1[key];
        }
        if (color1.H+60>359) {
            color2.H=color1.H-300;
            color3.H=color1.H-150;
        }
        else if (color1.H-150<0) { 
            color2.H=color1.H+60;
            color3.H=color1.H+210;
        }
        else  {
            color2.H=color1.H+60;
            color3.H=color1.H-150;
        }
        color2.col = "hsl(" + color2.H + "," + color2.S + "%," + color2.L + "%)";
        color3.col = "hsl(" + color3.H + "," + color3.S + "%," + color3.L + "%)";
        document.getElementById("color1").style.background = color1.col;
        document.getElementById("color2").style.background = color2.col;
        document.getElementById("color3").style.background = color3.col;
        document.getElementById("color4").style.background = "#fff";
        var kol=3;
        global(kol,color1,color2,color3);
};
