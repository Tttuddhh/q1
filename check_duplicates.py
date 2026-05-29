import re

# Read the file
with open('/workspace/q1/src/components/RichTextEditor.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract EMOJIS array
pattern = r'const EMOJIS = \[([\s\S]*?)\];'
match = re.search(pattern, content)
if not match:
    print("Could not find EMOJIS array")
    exit(1)

array_content = match.group(1)
# Extract individual emojis
emojis = re.findall(r"'([^']*)'", array_content)

original_count = len(emojis)
print(f"原始 emoji 数量: {original_count}")

# Find duplicates
seen = set()
duplicates = []
for emoji in emojis:
    if emoji in seen:
        duplicates.append(emoji)
    else:
        seen.add(emoji)

if duplicates:
    print(f"发现的重复项: {duplicates}")
else:
    print("没有发现重复项")

# Remove duplicates while preserving order
unique_emojis = []
seen = set()
for emoji in emojis:
    if emoji not in seen:
        unique_emojis.append(emoji)
        seen.add(emoji)

print(f"去重后的 emoji 数量: {len(unique_emojis)}")

# Rebuild the array with 10 items per line
lines = []
for i in range(0, len(unique_emojis), 10):
    chunk = unique_emojis[i:i+10]
    line = '  ' + ', '.join(f"'{e}'" for e in chunk)
    if i + 10 < len(unique_emojis):
        line += ','
    lines.append(line)

new_array = 'const EMOJIS = [\n' + '\n'.join(lines) + '\n];'

# Replace in content
new_content = re.sub(pattern, new_array, content)

with open('/workspace/q1/src/components/RichTextEditor.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("文件已更新")
