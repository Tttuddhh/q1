#!/usr/bin/env python3
"""分析 EMOJIS 数组中的小黄脸表情和其他分类"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def is_face_emoji(code):
    """判断是否为小黄脸表情"""
    # U+1F600 - U+1F64F: Emoticons (faces)
    # U+1F910 - U+1F91F: Neutral face, zipper mouth, etc.
    # U+1F920 - U+1F927: Face with cowboy hat, clown, nauseated, etc.
    # U+1F928 - U+1F92F: Face with raised eyebrow, star-struck, exploding head
    # U+1F970 - U+1F97A: Smiling face with hearts, yawning, etc.
    # U+1F9D0 - U+1F9D1: Face with monocle
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
    others = []

    for emoji in emojis:
        code = get_code_point(emoji)
        if is_face_emoji(code):
            faces.append(emoji)
        else:
            others.append(emoji)

    print(f"总 emoji 数量: {len(emojis)}")
    print(f"小黄脸表情数量: {len(faces)}")
    print(f"其他表情数量: {len(others)}")

    # 检查小黄脸中的重复
    seen_faces = set()
    dup_faces = []
    for e in faces:
        if e in seen_faces:
            dup_faces.append(e)
        seen_faces.add(e)

    if dup_faces:
        print(f"\n小黄脸中的重复项: {dup_faces}")
    else:
        print("\n小黄脸中无重复项")

    print("\n=== 当前小黄脸表情列表 ===")
    for i, e in enumerate(faces):
        print(f"{i+1:2d}. {e} (U+{get_code_point(e):04X})")

    # 检查是否有相似表情
    print("\n=== 检查相似表情 ===")
    face_codes = [get_code_point(e) for e in faces]
    for i, e1 in enumerate(faces):
        for j, e2 in enumerate(faces):
            if i < j and abs(face_codes[i] - face_codes[j]) <= 2:
                print(f"相似: {e1} (U+{face_codes[i]:04X}) 和 {e2} (U+{face_codes[j]:04X})")

if __name__ == '__main__':
    analyze()
