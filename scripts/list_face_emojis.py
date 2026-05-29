#!/usr/bin/env python3
"""列出小黄脸表情的排列（每排10个），并分析相似度"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def is_face_emoji(code):
    """判断是否为小黄脸表情"""
    return (0x1F600 <= code <= 0x1F64F or
            0x1F910 <= code <= 0x1F91F or
            0x1F920 <= code <= 0x1F927 or
            0x1F928 <= code <= 0x1F92F or
            0x1F970 <= code <= 0x1F97A or
            code == 0x1F9D0)

def analyze():
    with open('/workspace/q1/src/components/RichTextEditor.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'const EMOJIS = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("未找到 EMOJIS 数组")
        return

    array_content = match.group(1)
    emojis = re.findall(r"'([^']+)'", array_content)

    faces = []
    for emoji in emojis:
        code = get_code_point(emoji)
        if is_face_emoji(code):
            faces.append(emoji)

    print(f"总小黄脸表情数量: {len(faces)}")
    print("\n=== 小黄脸表情排列（每排10个）===\n")
    
    for row in range(0, len(faces), 10):
        row_num = row // 10 + 1
        row_emojis = faces[row:row+10]
        print(f"第{row_num:2d}排: ", end="")
        for i, e in enumerate(row_emojis):
            print(f"{e} ", end="")
        print()
        print(f"       ", end="")
        for i, e in enumerate(row_emojis):
            code = get_code_point(e)
            print(f"U+{code:04X} ", end="")
        print("\n")

    # 分析相似度 - 按Unicode码点分组
    print("\n=== 相似度分析（码点相近的表情）===\n")
    
    # 按码点排序
    sorted_faces = sorted(faces, key=lambda e: get_code_point(e))
    
    groups = []
    current_group = [sorted_faces[0]]
    
    for i in range(1, len(sorted_faces)):
        prev_code = get_code_point(sorted_faces[i-1])
        curr_code = get_code_point(sorted_faces[i])
        if curr_code - prev_code <= 3:
            current_group.append(sorted_faces[i])
        else:
            if len(current_group) >= 2:
                groups.append(current_group)
            current_group = [sorted_faces[i]]
    
    if len(current_group) >= 2:
        groups.append(current_group)
    
    for group in groups:
        if len(group) >= 2:
            codes = [get_code_point(e) for e in group]
            print(f"相似组: {' '.join(group)}")
            print(f"码点:   {' '.join([f'U+{c:04X}' for c in codes])}")
            print()

if __name__ == '__main__':
    analyze()
