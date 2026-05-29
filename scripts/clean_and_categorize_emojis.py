#!/usr/bin/env python3
"#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    ""#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800)#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) +#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code
#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def is_face_emoji(code):
#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def is_face_emoji(code):
    """判断是否为小黄脸表情"""
    return (0x1F600 <=#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

import re

def get_code_point(emoji):
    """获取 emoji 的第一个 Unicode 码点"""
    code = ord(emoji[0])
    if 0xD800 <= code <= 0xDBFF and len(emoji) > 1:
        code = ((code - 0xD800) << 10) + (ord(emoji[1]) - 0xDC00) + 0x10000
    return code

def is_face_emoji(code):
    """判断是否为小黄脸表情"""
    return (0x1F600 <= code <= 0x1F64F or#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
            0x1F910 <= code#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
            0x1F920 <= code <=#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
            0x1F928 <= code <= 0#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
            0#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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
            0x1F970 <= code <= 0x#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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

def categorize_emoji(emoji):
    ""#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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

def categorize_emoji(emoji):
    """分类 emoji"""
    code =#!/usr/bin/env python3
"""清理重复小黄脸，增加新表情，并按分类重新组织 EMOJIS 数组"""

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

def categorize_emoji(emoji):
    """分类 emoji"""
    code = get_code_point(emoji)

    if