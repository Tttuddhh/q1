#!/bin/bash
# 验证 Google Fonts 中文字体
google_fonts=(
  "Noto+Sans+SC"
  "Noto+Serif+SC"
  "Noto+Sans+HK"
  "Noto+Serif+HK"
  "Noto+Sans+TC"
  "Noto+Serif+TC"
  "LXGW+WenKai+TC"
  "LXGW+WenKai+Screen+TC"
  "LXGW+Marker+Gothic"
  "ZCOOL+XiaoWei"
  "ZCOOL+KuaiLe"
  "ZCOOL+QingKe+HuangYou"
  "Ma+Shan+Zheng"
  "Zhi+Mang+Xing"
  "Long+Cang"
  "Liu+Jian+Mao+Cao"
  "Chiron+GoRound+TC"
  "Chiron+Hei+HK"
  "Chiron+Sung+HK"
  "WDXL+Lubrifont+SC"
  "WDXL+Lubrifont+TC"
  "WDXL+Lubrifont+JP"
  "Cactus+Classical+Serif"
  "Chocolate+Classical+Sans"
  "Bpmf+Huninn"
  "Bpmf+Iansui"
  "Bpmf+Zihi+Kai+Std"
  "Huninn"
  "Iansui"
  "UoqMunThenKhung"
  "Noto+Sans+Mono+TC"
  "Noto+Serif+TC"
)

for f in "${google_fonts[@]}"; do
  url="https://fonts.googleapis.com/css2?family=${f}"
  status=$(curl -sI -A "Mozilla/5.0" "$url" | head -1 | awk '{print $2}')
  echo "$f: $status"
done
