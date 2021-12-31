export const timeFormatter = (num : number) : string => {
	if(num>=3600 && num<=86400) return `${Math.floor(num/3600)}Hr ${Math.floor((num%3600)/60)}Min  ${num%60}Sec}`;
	else if(num<3600 && num>=60) return `${Math.floor(num/60)}Min ${num%60}Sec`;
	else if(num<60 && num>=0) return `${num}Sec`;
	else return `0`;
}