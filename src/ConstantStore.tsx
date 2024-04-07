export const MP3List = [
  "Moon Gate.mp3",
  "Bonus track.mp3",
  "Coins Obtained.mp3",
  "default.mp3",
  "Kakeru Ishihama - キャッチアイ A.mp3",
  "Tom-H@ck - 変态乳牛.mp3",
  "TOMISIRO - 閑話休題.mp3",
  "根岸貴幸 - アイキャッチ.mp3",
  "菊池俊輔 - 未来の国からはるばると.mp3",
  "口琴.mp3",
  "七色巧克力.mp3",
  "下课.mp3",
  "英雄降临.mp3",
  "増田順一 - 回復.mp3",
  "威斯敏斯特钟声.mp3",
  "瓦妮莎的微笑.mp3",

  "眼保健操.mp3",
  "运动员进行曲.mp3",
  "大课间操跑步音乐.mp3",
  "检阅进行曲.mp3",

  "广播体操 第二套 时代在召唤.mp3",
  "广播体操 第三套 七彩阳光.mp3",
  "广播体操 第八套.mp3",
  "广播体操 第九套.mp3",
];

export const noRandomList = [
  "眼保健操.mp3",
  "运动员进行曲.mp3",
  "大课间操跑步音乐.mp3",
  "检阅进行曲.mp3",

  "广播体操 第二套 时代在召唤.mp3",
  "广播体操 第三套 七彩阳光.mp3",
  "广播体操 第八套.mp3",
  "广播体操 第九套.mp3",
];

export function getRandomMP3() {
  const availableOptions = MP3List.filter((mp3) => !noRandomList.includes(mp3));
  const randomIndex = Math.floor(Math.random() * availableOptions.length);
  return availableOptions[randomIndex];
}
