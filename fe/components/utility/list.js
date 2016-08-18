

export function listDel(num, list) {
  if (!num || !list) {
    throw new Error('请输入删除位置和数组');
  }
  if (num >= list.length || num < 0) {
    throw new Error('待删除位置超出数组长度');
  }


  let tempList = [];
  for (let i = 0; i < list.length; i++) {
    if (i === num) {
      continue;
    }
    templist.push(list[i]);
  }
  return tempList;
}
