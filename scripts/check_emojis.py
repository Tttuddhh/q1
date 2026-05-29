#!/usr/bin/env python3
"""检查 EMOJIS 数组中的重复项和 Unicode 码点"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    # 处理代理对
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def analyze_emojis():
    # 从 RichTextEditor.tsx 读取 EMOJIS 数组
    with open('/workspace/q1/src/components/RichTextEditor.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取 EMOJIS 数组内容
    match = re.search(r'const EMOJIS = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("未找到 EMOJIS 数组")
        return

    array_content = match.group(1)
    # 提取所有 emoji（在引号中的字符）
    emojis = re.findall(r"'([^']+)'", array_content)

    print(f"总 emoji 数量: {len(emojis)}")

    # 检查重复
    seen = set()
    duplicates = []
    for i, emoji in enumerate(emojis):
        if emoji in seen:
            duplicates.append((i, emoji))
        seen.add(emoji)

    if duplicates:
        print(f"\n发现 {len(duplicates)} 个重复项:")
        for idx, emoji in duplicates:
            print(f"  位置 {idx}: '{emoji}' (U+{ord(emoji[0]):04X})")
    else:
        print("\n未发现重复项")

    # 检查码点 > 0x1F900 的 emoji
    high_codepoints = []
    for i, emoji in enumerate(emojis):
        code = get_code_point(emoji)
        if code > 0x1F900:
            high_codepoints.append((i, emoji, code))

    if high_codepoints:
        print(f"\n发现 {len(high_codepoints)} 个码点 > 0x1F900 的 emoji:")
        for idx, emoji, code in high_codepoints:
            print(f"  位置 {idx}: '{emoji}' (U+{code:04X})")
    else:
        print("\n所有 emoji 码点 ≤ 0x1F900")

    # 统计分类
    categories = {
        '表情': 0,
        '手势': 0,
        '动物': 0,
        '食物': 0,
        '活动': 0,
        '物品': 0,
        '符号': 0,
        '其他': 0,
    }

    for emoji in emojis:
        code = get_code_point(emoji)
        if 0x1F600 <= code <= 0x1F64F:
            categories['表情'] += 1
        elif 0x1F300 <= code <= 0x1F5FF:
            categories['符号'] += 1
        elif 0x1F680 <= code <= 0x1F6FF:
            categories['活动'] += 1
        elif 0x1F400 <= code <= 0x1F4FF:
            if 0x1F400 <= code <= 0x1F43F:
                categories['动物'] += 1
            elif 0x1F440 <= code <= 0x1F4FF:
                categories['物品'] += 1
        elif 0x1F900 <= code <= 0x1F9FF:
            categories['手势'] += 1
        else:
            categories['其他'] += 1

    print("\n分类统计:")
    for cat, count in categories.items():
        print(f"  {cat}: {count}")

if __name__ == '__main__':
    analyze_emojis()
