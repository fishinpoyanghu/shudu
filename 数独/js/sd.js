/*************动态生成表格*******************/

var old_time={};
function loadTable(){
	$('#shudu').remove();
	console.log();
	$table=$("<table id='shudu' border='0' cellspacing='0'></table>");
	var $parent=$('#main');
	$parent.prepend($table);
	var $thead=$("<tbody></tbody>");		//可优化
	$table.append($thead);
	function ipt(min,max,i){
		for (var j = min; j < max; j++) {
			var $td=$("<td></td>");
			$tr.append($td);//onkeyup='keyconsole(event,this)
			var $input=$("<input type='text'>");
			$td.append($input);
			$input.attr('class','txt txt'+(i+1)+(j+1));
		}
	}
	for (var i = 0; i < 3; i++) {
		var $tr=$('<tr></tr>');
		$thead.append($tr);
		ipt(0,9,i);
	}
	var $tbody=$("<tbody></tbody>");
	$table.append($tbody);
	for (;i < 6; i++) {
		var $tr=$('<tr></tr>');
		$tbody.append($tr);
		ipt(0,9,i)
	}
	var $tfoot=$("<tbody></tbody>");
	$table.append($tfoot);
	for ( ;i < 9; i++) {
		var $tr=$('<tr></tr>');
		$tfoot.append($tr);
		ipt(0,9,i)
	}
	tableClass();
	old_time=new Date();
	$('#time>span:first').html(new Date().toTimeString().slice(0,9))
}
/************动态生成数字按钮*************/
function loadbtn () {
	$('.btnConsole').empty();
	for (var i = 0; i < 9; i++) {
		var $btn=$('<button type="button">'+(i+1)+'</button>');
		$('.btnConsole').append($btn);
		(i+1)%3==0&&$('.btnConsole').append($('<br>'));
	}
}
loadTable();										//加载表格
function ran_num(min,max){
	return parseInt(Math.random()*(max-min+1)+min);
}
function left_right(arr){
	var length=arr.length/3;
	var arr1=arr.slice(0,length);
	var arr2=arr.slice(length,2*length);
	var arr3=arr.slice(2*length,length*3);
	arr=arr3.concat(arr2,arr1);
	return arr;
}
function up_down(arr){
	var length=arr.length/3;
	for (var i=0,arr1=[],arr2=[],arr3=[]; i<9; i++)
	{
		arr1[i]=arr[i].slice(0,length);
		arr2[i]=arr[i].slice(length,2*length);
		arr3[i]=arr[i].slice(2*length,length*3);
	}
	for (var i=0; i<9; i++)
	{
		arr[i]=arr3[i].concat(arr2[i],arr1[i]);
	}
	return arr;
}
function main(arrShudu){
	var n=1;
	while(n!=75){
		n=parseInt(Math.random()*(51)+50);
		if(n%2==0){
			arr=up_down(arrShudu);
		}else{
			arrShudu=left_right(arrShudu);
		}
	}return arrShudu;
}
var arr=[];
var arrShudu=[
			[9,1,4,8,2,3,7,5,6],
			[6,3,2,7,9,5,8,4,1],
			[7,8,5,4,6,1,3,9,2],
			[5,2,1,6,3,4,9,8,7],
			[4,9,6,1,7,8,5,2,3],
			[8,7,3,9,5,2,1,6,4],
			[1,5,7,2,4,9,6,3,8],
			[2,6,9,3,8,7,4,1,5],
			[3,4,8,5,1,6,2,7,9]
];
while (arr.length<9){
	var num=ran_num(1,9);
	if (arr.indexOf(num)!=-1) {
		continue;
	}
	arr[arr.length]=num;
}
for (var i = 0; i < 9; i++) {  
    for (var j = 0; j < 9; j++) {  
        for (var k = 0; k < 9; k++) {  
            if(arrShudu[i][j]==arr[k])  
            {  
                arrShudu[i][j]=arr[(k+1)%9];  
                break;  
            }  
    	}  
    }  
}
arrShudu=main(arrShudu);
var arrShuduCopy=new Array(9);
$.each(arrShudu, function(i,n) {
	arrShuduCopy[i]=new Array(9);
	$.each(arrShudu[i], function(j,m) {
		arrShuduCopy[i][j]=m;
		
	});
});
function shuduDifficult(difficult)
{
    difficult =30+difficult*5;
    while (difficult)
    {
    	if (arrShuduCopy[ran_num(0,8)][ran_num(0,8)]) {
	        arrShuduCopy[ran_num(0,8)][ran_num(0,8)]="";
    		difficult--;
    	}
    }
}
shuduDifficult(ran_num(1,5));
$('input').each(function(i,n){
	n.value=arrShuduCopy[Math.floor(i/9)][i%9];
	if (n.value!="") {
		$(this).attr('disabled',true);
		$(this).css('background-color','#FFFFCC')
	}
});
function loading(){
	$('input').each(function(i,n){
		n.value=arrShuduCopy[Math.floor(i/9)][i%9];
	});
	$('#time>span:first').html(new Date().toTimeString().slice(0,9))
}
/*******************给input添加获得焦点事件***********************/
var focusNum=0;
var class1=0;
	$('td').delegate('input','focus',function(){
		$('.btnConsole>button').attr('disabled',false);
		class1=this.className;
		//console.log(class1);
		var me=this;
		var val=this.value;
		focusNum=me.value;
		loadbtn();
		$('.btnConsole>button').bind('click',function(){
			$(me).val($(this).html());
		});
		$('input').each(function(i,n){
			if (val==n.value) {
				$(this).addClass('high');
			}
		});
		$('input').each(function(i,n){
			if (val!=n.value) {
				$(this).removeClass('high');
			}
		});
	});
	/****************给键盘移动添加事件***********/
	$('td').delegate('input:enabled','keyup','event',function(evt){
		var inputs=$('input:enabled');
		var inputs_all=$('input');
		var value=0;
		var first_inputs=$('table tr:first input:enabled');
		var last_inputs=$('table tr:last input:enabled');
		var idx=inputs.index(this);
		var idx_all=inputs_all.index(this);
		switch(eval(evt.which)){
			case 37:idx!=0&&inputs[idx-1].select();break;
			case 38:idx_all>9&&inputs_all[idx_all-9].select();break;
			case 39:idx<inputs.length-1&&inputs[idx+1].select();break;
			case 40:idx_all<72&&inputs_all[idx_all+9].select();break;
		}
		/*******限制键盘输入********/
		$('td').delegate('input','keydown','event',function(evt){
			value=this.value;
		});
		if (!(/[1-9]+/g.test(this.value.slice(-1)))) {
			this.value=this.value.replace(/[^1-9]/g,'');
		}
		this.value=this.value.slice(-1);
	});
function checkSucess(){
	var ipt_values=[];
	var success=0
	$.each($('input'),function(i,n){
		ipt_values[i]=n.value;
	})
	$.each(arrShudu,function(i,n){
		$.each(arrShudu[i], function(j,m) {
			if(ipt_values[i*10+j-i]==m){
				//success++;
				if (++success==81) {
					var r=confirm('这一局，您胜利了，是否再来一局');
					r==true&&window.location.reload();
				}
				$($('input')[i*10+j-i]).removeClass('err');
			}else{
				if($('input')[i*10+j-i].value!=''){
					$($('input')[i*10+j-i]).addClass('err');
				}
			}
		});
	})
}
/*********清除错误提示******************/
function clearError(){
	$($('input')).removeClass('err');
	
}
	/**************给不同小九宫格改变颜色*****************/
function tableClass(){
	$('#shudu>tbody input[class*=4]').toggleClass('color');
	$('#shudu>tbody input[class*=5]').toggleClass('color');
	$('#shudu>tbody input[class*=6]').toggleClass('color');
	$('#shudu>tbody input[class*=44]').removeClass('color');
	$('#shudu>tbody input[class*=55]').removeClass('color');
	$('#shudu>tbody input[class*=66]').removeClass('color');
}
/********计时*************/
function showTime(){
	var oDate=new Date();
	var iHours=(oDate-old_time)/(60*60*1000)|0%60;
	var iMinute=(oDate-old_time)/(60*1000)|0%60;
	var iSecond=((oDate-old_time)/1000|0)%60;
	str=AddZero(iHours)+':'+AddZero(iMinute)+':'+AddZero(iSecond);
	$('#time>span:last').html(str);
	//hour.innerHTML=AddZero(iHours);
	//minute.innerHTML=AddZero(iMinute);
	//second.innerHTML=AddZero(iSecond);
}
var str='00:00:00'
$('#time>span:last').html(str);
setInterval(showTime,1000);
function AddZero(n){
	if(n<10){
		return '0'+n;
	}
	return ''+n;
}

	



































