import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 计算颜色的相对亮度（WCAG 标准）
function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const [lr, lg, lb] = [r, g, b].map(c => {
    if (c <= 0.03928) return c / 12.92;
    return Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

// 计算两个颜色的对比度比率
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// 根据背景色自动计算最佳文字颜色
// 策略：基于 HSL 色相的互补色/对比色方案，不只是黑白
// 1. 先计算背景色的 HSL 值
// 2. 生成多个候选文字色：白色、黑色、互补色、分裂互补色、对比色
// 3. 选择对比度最高且 >= 4.5 的颜色
function getContrastTextColor(bgColor: string): string {
  // 基础候选色：白、黑、深灰
  const candidates = [
    '#FFFFFF',
    '#000000',
    '#1F2937',
  ];

  // 将 hex 转为 RGB
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // 计算 HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  // 如果背景有饱和度，添加色相相关的候选色
  if (s > 0.05) {
    const hueDegrees = h * 360;

    // 互补色 (hue + 180°)
    const complementaryHue = (hueDegrees + 180) % 360;
    candidates.push(hslToHex(complementaryHue, Math.min(s * 100 + 20, 90), l > 0.5 ? 25 : 85));

    // 分裂互补色1 (hue + 150°)
    const splitComp1 = (hueDegrees + 150) % 360;
    candidates.push(hslToHex(splitComp1, Math.min(s * 100 + 10, 80), l > 0.5 ? 30 : 80));

    // 分裂互补色2 (hue + 210°)
    const splitComp2 = (hueDegrees + 210) % 360;
    candidates.push(hslToHex(splitComp2, Math.min(s * 100 + 10, 80), l > 0.5 ? 30 : 80));

    // 对比色 (hue + 120°)
    const contrastHue = (hueDegrees + 120) % 360;
    candidates.push(hslToHex(contrastHue, Math.min(s * 100, 85), l > 0.5 ? 30 : 80));

    // 如果背景是暖色(红橙黄)，添加冷色候选；冷色背景添加暖色候选
    if (hueDegrees >= 0 && hueDegrees < 60) {
      // 红色背景 -> 青绿/蓝绿
      candidates.push('#006B54');
      candidates.push('#004D40');
    } else if (hueDegrees >= 60 && hueDegrees < 120) {
      // 黄绿背景 -> 紫红/深紫
      candidates.push('#4A0080');
      candidates.push('#6B1A6B');
    } else if (hueDegrees >= 120 && hueDegrees < 180) {
      // 青绿背景 -> 深红/玫红
      candidates.push('#8B0000');
      candidates.push('#C2185B');
    } else if (hueDegrees >= 180 && hueDegrees < 240) {
      // 青色背景 -> 橙红/深橙
      candidates.push('#BF360C');
      candidates.push('#E65100');
    } else if (hueDegrees >= 240 && hueDegrees < 300) {
      // 蓝色背景 -> 黄橙/金色
      candidates.push('#F57F17');
      candidates.push('#FF8F00');
    } else {
      // 紫色背景 -> 黄绿/草绿
      candidates.push('#33691E');
      candidates.push('#558B2F');
    }
  }

  // 去重
  const uniqueCandidates = [...new Set(candidates)];

  // 选择对比度最高的颜色
  let bestColor = '#FFFFFF';
  let bestRatio = 0;

  for (const candidate of uniqueCandidates) {
    const ratio = getContrastRatio(bgColor, candidate);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestColor = candidate;
    }
  }

  return bestColor;
}

// HSL 转 Hex
function hslToHex(h: number, s: number, l: number): string {
  const hue = h / 360;
  const sat = s / 100;
  const light = l / 100;

  let r: number, g: number, b: number;

  if (sat === 0) {
    r = g = b = light;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
    const p = 2 * light - q;
    r = hue2rgb(p, q, hue + 1/3);
    g = hue2rgb(p, q, hue);
    b = hue2rgb(p, q, hue - 1/3);
  }

  const toHex = (c: number) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export type ThemeColorScheme = {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  desc: string;
  longDesc: string;
  hex: string;
  subDesc: string;
  variants: {
    bg: string;
    text: string;
    accent: string;
    hex: string;
    subDesc: string;
    variantDesc: string;
  }[];
};

const colorSchemes: ThemeColorScheme[] = [
  {
    id: 'low-saturation',
    name: '低饱和',
    bg: '#3A506B',
    text: '#FFFFFF',
    accent: '#7BA3C0',
    desc: '超~舒服！',
    longDesc: '低对比灰蓝调，长时间阅读不易疲劳，适合专注写作',
    hex: '#3A506B',
    subDesc: '深灰蓝',
    variants: [
      { bg: '#3A506B', text: '#FFFFFF', accent: '#7BA3C0', hex: '#3A506B', subDesc: '深灰蓝', variantDesc: '深沉稳重的色调，适合需要专注和思考的写作场景' },
      { bg: '#5BC0BE', text: '#FFFFFF', accent: '#7BA3C0', hex: '#5BC0BE', subDesc: '柔青绿', variantDesc: '清新自然的色调，带来轻松愉悦的写作体验' },
      { bg: '#CDEDF6', text: '#2D3748', accent: '#7BA3C0', hex: '#CDEDF6', subDesc: '浅雾蓝', variantDesc: '轻盈通透的色调，让思绪更加清晰明朗' },
      { bg: '#BFA5A0', text: '#FFFFFF', accent: '#7BA3C0', hex: '#BFA5A0', subDesc: '灰粉', variantDesc: '温暖柔和的色调，营造舒适惬意的写作氛围' },
      { bg: '#F5F5F5', text: '#2D3748', accent: '#7BA3C0', hex: '#F5F5F5', subDesc: '奶白粉', variantDesc: '纯净简约的色调，回归本真，专注内容创作' },
      { bg: '#4A6FA5', text: '#FFFFFF', accent: '#7BA3C0', hex: '#4A6FA5', subDesc: '柔灰蓝', variantDesc: '宁静致远的色调，让心灵沉淀，思绪飞扬' },
      { bg: '#F2A65A', text: '#FFFFFF', accent: '#7BA3C0', hex: '#F2A65A', subDesc: '柔橙', variantDesc: '活力温暖的色调，激发创作灵感与热情' },
      { bg: '#6B705C', text: '#FFFFFF', accent: '#7BA3C0', hex: '#6B705C', subDesc: '橄榄灰绿', variantDesc: '质朴自然的色调，感受大地的呼吸与生命力' },
      { bg: '#A5A58D', text: '#FFFFFF', accent: '#7BA3C0', hex: '#A5A58D', subDesc: '浅橄榄', variantDesc: '淡雅素净的色调，简约而不简单，品味生活' },
      { bg: '#9A8C98', text: '#FFFFFF', accent: '#7BA3C0', hex: '#9A8C98', subDesc: '浅灰紫', variantDesc: '优雅沉静的色调，高贵而不张扬，从容淡定' },
    ],
  },
  {
    id: 'fresh',
    name: '清新',
    bg: '#44A08D',
    text: '#FFFFFF',
    accent: '#4ECDC4',
    desc: '超~清爽！',
    longDesc: '薄荷与青绿交织，像清晨的第一口空气，清爽提神',
    hex: '#44A08D',
    subDesc: '薄荷绿',
    variants: [
      { bg: '#44A08D', text: '#FFFFFF', accent: '#4ECDC4', hex: '#44A08D', subDesc: '薄荷绿' },
      { bg: '#4ECDC4', text: '#FFFFFF', accent: '#96E6A1', hex: '#4ECDC4', subDesc: '青绿' },
      { bg: '#96E6A1', text: '#2D3748', accent: '#44A08D', hex: '#96E6A1', subDesc: '嫩绿' },
      { bg: '#88D8B0', text: '#2D3748', accent: '#44A08D', hex: '#88D8B0', subDesc: '薄荷' },
    ],
  },
  {
    id: 'summer',
    name: '夏日',
    bg: '#FF6B6B',
    text: '#FFFFFF',
    accent: '#FFA07A',
    desc: '超~热情！',
    longDesc: '珊瑚红与柠檬黄的碰撞，热情活力，点亮整个夏天',
    hex: '#FF6B6B',
    subDesc: '珊瑚红',
    variants: [
      { bg: '#FF6B6B', text: '#FFFFFF', accent: '#FFA07A', hex: '#FF6B6B', subDesc: '珊瑚红' },
      { bg: '#FFA07A', text: '#FFFFFF', accent: '#FFD93D', hex: '#FFA07A', subDesc: '浅珊瑚' },
      { bg: '#FFD93D', text: '#2D3748', accent: '#FF6B6B', hex: '#FFD93D', subDesc: '柠檬黄' },
      { bg: '#6BCB77', text: '#FFFFFF', accent: '#4D96FF', hex: '#6BCB77', subDesc: '草绿' },
    ],
  },
  {
    id: 'bauhaus',
    name: '包豪斯',
    bg: '#457B9D',
    text: '#FFFFFF',
    accent: '#E63946',
    desc: '超~艺术！',
    longDesc: '经典蓝红几何，现代主义设计语言的完美诠释',
    hex: '#457B9D',
    subDesc: '经典蓝',
    variants: [
      { bg: '#457B9D', text: '#FFFFFF', accent: '#E63946', hex: '#457B9D', subDesc: '经典蓝' },
      { bg: '#E63946', text: '#FFFFFF', accent: '#F1FAEE', hex: '#E63946', subDesc: '包豪斯红' },
      { bg: '#F1FAEE', text: '#1D3557', accent: '#457B9D', hex: '#F1FAEE', subDesc: '米白' },
      { bg: '#A8DADC', text: '#1D3557', accent: '#457B9D', hex: '#A8DADC', subDesc: '浅蓝' },
    ],
  },
  {
    id: 'brand',
    name: '品牌',
    bg: '#FF6A3D',
    text: '#FFFFFF',
    accent: '#FF8C69',
    desc: '超~亮眼！',
    longDesc: '活力橙主调，辨识度高，让品牌一眼被记住',
    hex: '#FF6A3D',
    subDesc: '活力橙',
    variants: [
      { bg: '#FF6A3D', text: '#FFFFFF', accent: '#FF8C69', hex: '#FF6A3D', subDesc: '活力橙' },
      { bg: '#FF8C69', text: '#FFFFFF', accent: '#FFB199', hex: '#FF8C69', subDesc: '浅橙' },
      { bg: '#FFB199', text: '#2D3748', accent: '#FF6A3D', hex: '#FFB199', subDesc: '蜜桃' },
      { bg: '#FFD4C4', text: '#2D3748', accent: '#FF6A3D', hex: '#FFD4C4', subDesc: '杏色' },
    ],
  },
  {
    id: 'elegant',
    name: '优雅',
    bg: '#6B5B95',
    text: '#FFFFFF',
    accent: '#92A8D1',
    desc: '超~高级！',
    longDesc: '薰衣草与玫瑰粉，高贵而不张扬，商务场合首选',
    hex: '#6B5B95',
    subDesc: '薰衣草',
    variants: [
      { bg: '#6B5B95', text: '#FFFFFF', accent: '#92A8D1', hex: '#6B5B95', subDesc: '薰衣草' },
      { bg: '#92A8D1', text: '#FFFFFF', accent: '#F7CAC9', hex: '#92A8D1', subDesc: '淡紫' },
      { bg: '#F7CAC9', text: '#2D3748', accent: '#6B5B95', hex: '#F7CAC9', subDesc: '玫瑰粉' },
      { bg: '#88B04B', text: '#FFFFFF', accent: '#92A8D1', hex: '#88B04B', subDesc: '橄榄绿' },
    ],
  },
  {
    id: 'nature',
    name: '自然',
    bg: '#228B22',
    text: '#FFFFFF',
    accent: '#8FBC8F',
    desc: '超~自然！',
    longDesc: '森林绿与麦色，回归本真，感受大地的呼吸',
    hex: '#228B22',
    subDesc: '森林绿',
    variants: [
      { bg: '#228B22', text: '#FFFFFF', accent: '#8FBC8F', hex: '#228B22', subDesc: '森林绿' },
      { bg: '#8FBC8F', text: '#2D3748', accent: '#228B22', hex: '#8FBC8F', subDesc: '浅绿' },
      { bg: '#DEB887', text: '#2D3748', accent: '#228B22', hex: '#DEB887', subDesc: '麦色' },
      { bg: '#F4A460', text: '#FFFFFF', accent: '#DEB887', hex: '#F4A460', subDesc: '沙棕' },
    ],
  },
  {
    id: 'ocean',
    name: '海洋',
    bg: '#006994',
    text: '#FFFFFF',
    accent: '#4A90E2',
    desc: '超~深邃！',
    longDesc: '深海蓝层层递进，宁静致远，适合深度思考',
    hex: '#006994',
    subDesc: '深海蓝',
    variants: [
      { bg: '#006994', text: '#FFFFFF', accent: '#4A90E2', hex: '#006994', subDesc: '深海蓝' },
      { bg: '#4A90E2', text: '#FFFFFF', accent: '#87CEEB', hex: '#4A90E2', subDesc: '天蓝' },
      { bg: '#87CEEB', text: '#2D3748', accent: '#006994', hex: '#87CEEB', subDesc: '浅蓝' },
      { bg: '#B0E0E6', text: '#2D3748', accent: '#4A90E2', hex: '#B0E0E6', subDesc: '粉蓝' },
    ],
  },
];

interface ThemeColorCarouselProps {
  selectedScheme: string;
  onSelect: (schemeId: string) => void;
}

const ANIMATION_DURATION = 400;
const CENTER_WIDTH = 180;
const CENTER_HEIGHT = 115;
const CENTER_SPACING = 170;

export function ThemeColorCarousel({ selectedScheme, onSelect }: ThemeColorCarouselProps) {
  const [schemeIndex, setSchemeIndex] = useState(() => {
    const idx = colorSchemes.findIndex(s => s.id === selectedScheme);
    return idx >= 0 ? idx : 0;
  });

  const [variantIndex, setVariantIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const animatingRef = useRef(false);
  const boxRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);

  const currentScheme = colorSchemes[schemeIndex];
  const variants = currentScheme.variants;

  useLayoutEffect(() => {
    animatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleSchemeClick = useCallback((index: number) => {
    if (animatingRef.current) return;
    setSchemeIndex(index);
    setVariantIndex(0);
    onSelect(colorSchemes[index].id);
  }, [onSelect]);

  const getVisibleVariants = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      let idx = variantIndex + i;
      if (idx < 0) idx = variants.length + idx;
      if (idx >= variants.length) idx = idx - variants.length;
      result.push({
        variant: variants[idx],
        offsetIndex: i,
        realIndex: idx,
      });
    }
    return result;
  };

  const visibleVariants = getVisibleVariants();

  const getBoxCenterPosition = (offsetIndex: number) => {
    return offsetIndex * CENTER_SPACING;
  };

  const getStaticTransform = (offsetIndex: number) => {
    const centerX = getBoxCenterPosition(offsetIndex);
    const isCenter = offsetIndex === 0;
    return `translate(${centerX}px, -50%) scale(${isCenter ? 1 : 0.65})`;
  };

  const getTargetTransform = (offsetIndex: number, direction: 'left' | 'right') => {
    const baseCenterX = getBoxCenterPosition(offsetIndex);

    if (direction === 'right') {
      const targetCenterX = baseCenterX - CENTER_SPACING;
      const willBeCenter = offsetIndex === 1;
      const targetScale = willBeCenter ? 1 : 0.65;
      return `translate(${targetCenterX}px, -50%) scale(${targetScale})`;
    } else {
      const targetCenterX = baseCenterX + CENTER_SPACING;
      const willBeCenter = offsetIndex === -1;
      const targetScale = willBeCenter ? 1 : 0.65;
      return `translate(${targetCenterX}px, -50%) scale(${targetScale})`;
    }
  };

  const performAnimation = useCallback((direction: 'left' | 'right') => {
    if (animatingRef.current) return;

    const startTransforms = new Map<string, string>();
    visibleVariants.forEach(({ variant, offsetIndex }) => {
      const el = boxRefs.current.get(variant.hex);
      if (el) {
        const computedTransform = window.getComputedStyle(el).transform;
        startTransforms.set(variant.hex, computedTransform);
      }
    });

    const targets = new Map<string, string>();
    visibleVariants.forEach(({ variant, offsetIndex }) => {
      targets.set(variant.hex, getTargetTransform(offsetIndex, direction));
    });

    visibleVariants.forEach(({ variant }) => {
      const el = boxRefs.current.get(variant.hex);
      if (el && startTransforms.has(variant.hex)) {
        el.style.transition = 'none';
        el.style.transform = startTransforms.get(variant.hex)!;
      }
    });

    document.body.offsetHeight;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        visibleVariants.forEach(({ variant }) => {
          const el = boxRefs.current.get(variant.hex);
          if (el && targets.has(variant.hex)) {
            el.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            el.style.transform = targets.get(variant.hex)!;
          }
        });

        setIsAnimating(true);
        animatingRef.current = true;
        setAnimationDirection(direction);

        setTimeout(() => {
          setVariantIndex(prev => {
            if (direction === 'right') {
              return prev < variants.length - 1 ? prev + 1 : 0;
            } else {
              return prev > 0 ? prev - 1 : variants.length - 1;
            }
          });
          setIsAnimating(false);
          animatingRef.current = false;
          setAnimationDirection(null);

          visibleVariants.forEach(({ variant }) => {
            const el = boxRefs.current.get(variant.hex);
            if (el) {
              el.style.transition = '';
            }
          });
        }, ANIMATION_DURATION);
      });
    });
  }, [visibleVariants, variants.length]);

  const handlePrev = useCallback(() => {
    performAnimation('left');
  }, [performAnimation]);

  const handleNext = useCallback(() => {
    performAnimation('right');
  }, [performAnimation]);

  const getBoxStaticStyle = (offsetIndex: number) => {
    const isCenter = offsetIndex === 0;
    return {
      transform: getStaticTransform(offsetIndex),
      zIndex: isCenter ? 5 : 1,
      opacity: 1,
    };
  };

  return (
    <div style={{ width: '100%' }}>
      {/* 顶部文字标签 - 选择配色方案 */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 32,
          minHeight: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {colorSchemes.map((scheme, idx) => (
          <span
            key={scheme.id}
            onClick={() => handleSchemeClick(idx)}
            style={{
              fontSize: idx === schemeIndex ? 24 : 14,
              fontWeight: idx === schemeIndex ? 700 : 400,
              color: idx === schemeIndex ? '#1F2937' : '#9CA3AF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '0 4px',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {scheme.name}
          </span>
        ))}
      </div>

      {/* 轮播容器 - 显示当前方案的 variants */}
      <div
        style={{
          position: 'relative',
          height: 170,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 左侧渐变遮罩 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        {/* 右侧渐变遮罩 */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 40,
            background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* 左箭头 */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid #e5e7eb',
            background: 'white',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            opacity: isAnimating ? 0.5 : 1,
          }}
          onMouseEnter={e => {
            if (!isAnimating) e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>

        {/* 方框容器 - 显示当前方案的 variants */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 0,
            height: 0,
          }}
        >
          {visibleVariants.map(({ variant, offsetIndex, realIndex }) => {
            const boxStyle = getBoxStaticStyle(offsetIndex);
            const isCenter = offsetIndex === 0;
            const textColor = getContrastTextColor(variant.bg);

            return (
              <div
                key={`${currentScheme.id}-${variant.hex}-${offsetIndex}`}
                ref={el => {
                  if (el) {
                    boxRefs.current.set(variant.hex, el);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: CENTER_WIDTH,
                  height: CENTER_HEIGHT,
                  borderRadius: 12,
                  background: variant.bg,
                  cursor: 'pointer',
                  transform: boxStyle.transform,
                  zIndex: boxStyle.zIndex,
                  opacity: boxStyle.opacity,
                  boxShadow: isCenter
                    ? '0 4px 12px rgba(0,0,0,0.15)'
                    : '0 2px 6px rgba(0,0,0,0.1)',
                  transformOrigin: 'center center',
                  willChange: 'transform',
                }}
              >
                {/* 内容容器 */}
                <div
                  style={{
                    padding: 16,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: CENTER_WIDTH,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: textColor,
                        lineHeight: 1.2,
                      }}
                    >
                      {currentScheme.desc}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: textColor,
                        opacity: 0.8,
                        marginTop: 4,
                      }}
                    >
                      {currentScheme.name}配色！
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: `${textColor}99`,
                      }}
                    >
                      （{variant.subDesc}）
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: textColor,
                        }}
                      >
                        {variant.hex}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 右箭头 */}
        <button
          onClick={handleNext}
          disabled={isAnimating}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid #e5e7eb',
            background: 'white',
            cursor: isAnimating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            opacity: isAnimating ? 0.5 : 1,
          }}
          onMouseEnter={e => {
            if (!isAnimating) e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* 配色描述和应用按钮 */}
      <div
        style={{
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: '#4B5563',
            marginBottom: 20,
          }}
        >
          {variants[variantIndex].variantDesc}
        </div>
        <button
          onClick={() => onSelect(currentScheme.id)}
          disabled={selectedScheme === currentScheme.id}
          style={{
            backgroundColor: currentScheme.accent,
            color: '#FFFFFF',
            borderRadius: 8,
            padding: '10px 48px',
            width: '100%',
            maxWidth: 280,
            border: 'none',
            cursor: selectedScheme === currentScheme.id ? 'not-allowed' : 'pointer',
            opacity: selectedScheme === currentScheme.id ? 0.6 : 1,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {selectedScheme === currentScheme.id ? '当前主题' : '应用该主题'}
        </button>
      </div>
    </div>
  );
}

export { colorSchemes };
