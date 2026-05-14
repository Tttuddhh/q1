import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colorSchemes } from './colorSchemes';

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

function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastTextColor(bgColor: string): string {
  const candidates = ['#FFFFFF', '#000000', '#1F2937'];

  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

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

  if (s > 0.05) {
    const hueDegrees = h * 360;
    const complementaryHue = (hueDegrees + 180) % 360;
    candidates.push(hslToHex(complementaryHue, Math.min(s * 100 + 20, 90), l > 0.5 ? 25 : 85));
    const splitComp1 = (hueDegrees + 150) % 360;
    candidates.push(hslToHex(splitComp1, Math.min(s * 100 + 10, 80), l > 0.5 ? 30 : 80));
    const splitComp2 = (hueDegrees + 210) % 360;
    candidates.push(hslToHex(splitComp2, Math.min(s * 100 + 10, 80), l > 0.5 ? 30 : 80));
    const contrastHue = (hueDegrees + 120) % 360;
    candidates.push(hslToHex(contrastHue, Math.min(s * 100, 85), l > 0.5 ? 30 : 80));

    if (hueDegrees >= 0 && hueDegrees < 60) {
      candidates.push('#006B54', '#004D40');
    } else if (hueDegrees >= 60 && hueDegrees < 120) {
      candidates.push('#4A0080', '#6B1A6B');
    } else if (hueDegrees >= 120 && hueDegrees < 180) {
      candidates.push('#8B0000', '#C2185B');
    } else if (hueDegrees >= 180 && hueDegrees < 240) {
      candidates.push('#BF360C', '#E65100');
    } else if (hueDegrees >= 240 && hueDegrees < 300) {
      candidates.push('#F57F17', '#FF8F00');
    } else {
      candidates.push('#33691E', '#558B2F');
    }
  }

  const uniqueCandidates = [...new Set(candidates)];
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

interface ThemeColorCarouselProps {
  selectedScheme: string;
  selectedVariantHex?: string;
  onSelect: (schemeId: string, color: string) => void;
}

const ANIMATION_DURATION = 400;
const CENTER_WIDTH = 180;
const CENTER_HEIGHT = 115;
const CENTER_SPACING = 170;

export function ThemeColorCarousel({ selectedScheme, selectedVariantHex, onSelect }: ThemeColorCarouselProps) {
  const [schemeIndex, setSchemeIndex] = useState(() => {
    const defaultIndex = colorSchemes.findIndex(s => s.id === 'low-saturation');
    return defaultIndex >= 0 ? defaultIndex : 0;
  });

  const [variantIndex, setVariantIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);
  const animatingRef = useRef(false);
  const boxRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const tabRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  const currentScheme = colorSchemes[schemeIndex];
  const variants = currentScheme.variants;
  const isApplied = colorSchemes.some(s => s.id === selectedScheme) && selectedScheme === currentScheme.id && selectedVariantHex === variants[variantIndex].hex;

  useLayoutEffect(() => {
    animatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleSchemeClick = useCallback((index: number) => {
    if (animatingRef.current) return;

    const startTransforms = new Map<string, string>();
    colorSchemes.forEach(scheme => {
      const el = tabRefs.current.get(scheme.id);
      if (el) {
        startTransforms.set(scheme.id, window.getComputedStyle(el).transform);
      }
    });

    colorSchemes.forEach(scheme => {
      const el = tabRefs.current.get(scheme.id);
      if (el && startTransforms.has(scheme.id)) {
        el.style.transition = 'none';
        el.style.transform = startTransforms.get(scheme.id)!;
      }
    });

    void document.body.offsetHeight;

    colorSchemes.forEach(scheme => {
      const el = tabRefs.current.get(scheme.id);
      if (el) {
        el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.transform = scheme.id === colorSchemes[index].id ? 'scale(1.7)' : 'scale(1)';
      }
    });

    setTimeout(() => {
      setSchemeIndex(index);
      setVariantIndex(0);
      colorSchemes.forEach(scheme => {
        const el = tabRefs.current.get(scheme.id);
        if (el) el.style.transition = '';
      });
    }, 300);
  }, []);

  const getVisibleVariants = () => {
    const result: { variant: typeof variants[0]; offsetIndex: number }[] = [];
    for (let i = -3; i <= 3; i++) {
      let idx = variantIndex + i;
      if (idx < 0) idx = variants.length + idx;
      if (idx >= variants.length) idx = idx - variants.length;
      result.push({
        variant: variants[idx],
        offsetIndex: i,
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
    const scale = offsetIndex === 0 ? 1 : 0.65;
    const translateY = -CENTER_HEIGHT / 2;
    return `translate(${centerX}px, ${translateY}px) scale(${scale})`;
  };

  const getBoxStaticStyle = (offsetIndex: number) => {
    const isCenter = offsetIndex === 0;
    return {
      transform: getStaticTransform(offsetIndex),
      zIndex: isCenter ? 5 : 1,
      opacity: 1,
    };
  };

  const getBoxShadow = (offsetIndex: number) => {
    return offsetIndex === 0
      ? '0 4px 12px rgba(0,0,0,0.15)'
      : '0 2px 6px rgba(0,0,0,0.1)';
  };

  const performAnimation = useCallback((direction: 'left' | 'right') => {
    if (animatingRef.current) return;

    const refKey = (hex: string, offset: number) => `${currentScheme.id}-${hex}-${offset}`;

    const startTransforms = new Map<string, string>();
    const startShadows = new Map<string, string>();
    visibleVariants.forEach(({ variant, offsetIndex }) => {
      const el = boxRefs.current.get(refKey(variant.hex, offsetIndex));
      if (el) {
        const computedTransform = window.getComputedStyle(el).transform;
        startTransforms.set(refKey(variant.hex, offsetIndex), computedTransform);
        startShadows.set(refKey(variant.hex, offsetIndex), getBoxShadow(offsetIndex));
      }
    });

    const targets = new Map<string, string>();
    const targetShadows = new Map<string, string>();
    const translateY = -CENTER_HEIGHT / 2;
    visibleVariants.forEach(({ variant, offsetIndex }) => {
      if (direction === 'right') {
        const targetOffset = offsetIndex - 1;
        const targetScale = targetOffset === 0 ? 1 : 0.65;
        const targetX = targetOffset * CENTER_SPACING;
        targets.set(refKey(variant.hex, offsetIndex), `translate(${targetX}px, ${translateY}px) scale(${targetScale})`);
        targetShadows.set(refKey(variant.hex, offsetIndex), getBoxShadow(targetOffset));
      } else {
        const targetOffset = offsetIndex + 1;
        const targetScale = targetOffset === 0 ? 1 : 0.65;
        const targetX = targetOffset * CENTER_SPACING;
        targets.set(refKey(variant.hex, offsetIndex), `translate(${targetX}px, ${translateY}px) scale(${targetScale})`);
        targetShadows.set(refKey(variant.hex, offsetIndex), getBoxShadow(targetOffset));
      }
    });

    visibleVariants.forEach(({ variant, offsetIndex }) => {
      const el = boxRefs.current.get(refKey(variant.hex, offsetIndex));
      if (el && startTransforms.has(refKey(variant.hex, offsetIndex))) {
        el.style.transition = 'none';
        el.style.transform = startTransforms.get(refKey(variant.hex, offsetIndex))!;
        el.style.boxShadow = startShadows.get(refKey(variant.hex, offsetIndex))!;
      }
    });

    void document.body.offsetHeight;

    visibleVariants.forEach(({ variant, offsetIndex }) => {
      const el = boxRefs.current.get(refKey(variant.hex, offsetIndex));
      if (el && targets.has(refKey(variant.hex, offsetIndex))) {
        el.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = targets.get(refKey(variant.hex, offsetIndex))!;
        el.style.boxShadow = targetShadows.get(refKey(variant.hex, offsetIndex))!;
      }
    });

    setIsAnimating(true);
    animatingRef.current = true;

    setTimeout(() => {
      setVariantIndex(prev => {
        if (direction === 'right') return prev < variants.length - 1 ? prev + 1 : 0;
        else return prev > 0 ? prev - 1 : variants.length - 1;
      });
      setIsAnimating(false);
      animatingRef.current = false;

      visibleVariants.forEach(({ variant, offsetIndex }) => {
        const el = boxRefs.current.get(refKey(variant.hex, offsetIndex));
        if (el) {
          el.style.transition = '';
          el.style.boxShadow = '';
        }
      });
    }, ANIMATION_DURATION + 50);
  }, [visibleVariants, variants.length, currentScheme.id]);

  const handlePrev = useCallback(() => {
    performAnimation('left');
  }, [performAnimation]);

  const handleNext = useCallback(() => {
    performAnimation('right');
  }, [performAnimation]);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: 32,
          minHeight: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'nowrap',
          overflow: 'auto',
        }}
      >
        {colorSchemes.map((scheme, idx) => {
          const isSelected = scheme.id === selectedScheme;
          const isActive = idx === schemeIndex;
          return (
            <span
              key={scheme.id}
              onClick={() => handleSchemeClick(idx)}
              ref={el => {
                if (el) tabRefs.current.set(scheme.id, el);
              }}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: isSelected ? 'var(--color-primary-dark)' : (isActive ? '#1F2937' : '#9CA3AF'),
                cursor: 'pointer',
                transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '0 12px',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                position: 'relative',
                transform: isActive ? 'scale(1.7)' : 'scale(1)',
                transformOrigin: 'center center',
              }}
            >
              {scheme.name}
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: '#FF743D',
                  }}
                />
              )}
            </span>
          );
        })}
      </div>

      <div
        style={{
          position: 'relative',
          height: 170,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background: 'linear-gradient(to right, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background: 'linear-gradient(to left, #ffffff 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

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
          {visibleVariants.map(({ variant, offsetIndex }) => {
            const boxStyle = getBoxStaticStyle(offsetIndex);
            const isCenter = offsetIndex === 0;
            const textColor = getContrastTextColor(variant.bg);

            return (
              <div
                key={`${currentScheme.id}-${variant.hex}-${offsetIndex}`}
                ref={el => {
                  if (el) {
                    boxRefs.current.set(`${currentScheme.id}-${variant.hex}-${offsetIndex}`, el);
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
          onClick={() => {
            onSelect(currentScheme.id, variants[variantIndex].hex);
          }}
          disabled={isApplied}
          style={{
            backgroundColor: '#FF743D',
            color: '#FFFFFF',
            borderRadius: 8,
            padding: '10px 48px',
            width: '100%',
            maxWidth: 280,
            border: 'none',
            cursor: isApplied ? 'not-allowed' : 'pointer',
            opacity: isApplied ? 0.6 : 1,
            fontSize: 14,
            fontWeight: 600,
            transition: 'opacity 0.2s ease, transform 0.15s ease',
          }}
          onMouseDown={e => {
            if (!isApplied) {
              e.currentTarget.style.transform = 'scale(0.97)';
            }
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isApplied ? '当前主题' : '应用该主题'}
        </button>
      </div>
    </div>
  );
}