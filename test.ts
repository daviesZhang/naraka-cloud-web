const data = {J100: '001', J200: '001', J300: '002', J400: '003'};
const temp = new Map();
const result = [];
Object.entries(data).forEach(([key,value]) => {
  if (temp.has(value)) {
    temp.set(value, [...temp.get(value), key]);
  }else{
    temp.set(value, [key]);
  }
});
temp.forEach((value, key) => {
  result.push({key:value.length>1?value:value[0], value: key})
});
console.log(result);
