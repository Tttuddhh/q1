#!/bin/bash
# 验证 jsDelivr Fontsource 中文字体包
jsdelivr_fonts=(
  "noto-sans-sc"
  "noto-serif-sc"
  "noto-sans-tc"
  "noto-serif-tc"
  "noto-sans-hk"
  "noto-serif-hk"
  "lxgw-wenkai-tc"
  "lxgw-wenkai-screen-tc"
  "lxgw-marker-gothic"
  "zcool-xiaowei"
  "zcool-kuaile"
  "zcool-qingke-huangyou"
  "ma-shan-zheng"
  "long-cang"
  "zhi-mang-xing"
  "huninn"
  "iansui"
  "bpmf-huninn"
  "bpmf-iansui"
  "bpmf-zihi-kai-std"
  "chiron-go-round-tc"
  "chiron-hei-hk"
  "chiron-sung-hk"
  "wdxl-lubrifont-sc"
  "wdxl-lubrifont-tc"
  "wdxl-lubrifont-jp"
  "cactus-classical-serif"
  "chocolate-classical-sans"
  "uoq-mun-then-khung"
  "noto-sans-jp"
  "noto-serif-jp"
  "noto-sans-kr"
  "noto-serif-kr"
)

for f in "${jsdelivr_fonts[@]}"; do
  url="https://cdn.jsdelivr.net/npm/@fontsource/${f}/"
  status=$(curl -sI "$url" | head -1 | awk '{print $2}')
  echo "$f: $status"
done
