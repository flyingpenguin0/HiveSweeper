const toTwoDigits= (num:number) : string => {
	if(num<10){
		return `0${num}`;
	} else return `${num}`;
}

export const timeFormatter = (num : number) : string => {
	if(num>=3600 && num<=86400) return `${toTwoDigits(Math.floor(num/3600))} : ${toTwoDigits(Math.floor((num%3600)/60))} :  ${toTwoDigits(num%60)}}`;
	else if(num<3600 && num>=60) return `00 : ${toTwoDigits(Math.floor(num/60))} : ${toTwoDigits(num%60)}`;
	else if(num<60 && num>=0) return `00 : 00 : ${toTwoDigits(num)}`;
	else return `0`;
}

