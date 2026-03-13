import _ from 'lodash'

export function switchRoute(routeName: string, params?: any) {
    return {
        index: 0,
        routes: [{ name: routeName, params }],

    }
}

export function compareArrayString(a: string[] | null, b: string[] | null): boolean {
    if (a === b) return true
    if (!a || !b) return false
    if (a.length !== b.length) return false
    const setA = new Set(a)
    return b.every(item => setA.has(item))
}

type GradientOptions = {
    angle?: number;
    extend?: number; // how far outside (0.5 is nice)
};

export function createGradient({
    angle = 0,
    extend = 0.5,
}: GradientOptions = {}) {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad);
    const y = Math.sin(rad);

    return {
        start: {
            x: 0.5 - x * extend,
            y: 0.5 - y * extend,
        },
        end: {
            x: 0.5 + x * extend,
            y: 0.5 + y * extend,
        },
    };
}

export function groupByData(data: Array<any>, field: string, fields?: string[] | string) {
    const rows = _.chain(data)
        .groupBy(fields || field)
        .map((value: any[]) => ({ [field]: value[0][field], data: value as typeof data }))
        .value();
    return rows;
}

// Converts HSL values to a hex color string for expo-linear-gradient
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export interface GradientConfig {
    // Base linear gradient (background layer)
    base: {
        colors: [string, string];
        start: { x: number; y: number };
        end: { x: number; y: number };
    };
    // Bottom-right glow layer
    glowBottom: {
        colors: [string, string];
        start: { x: number; y: number };
        end: { x: number; y: number };
    };
    // Top-right glow layer
    glowTop: {
        colors: [string, string];
        start: { x: number; y: number };
        end: { x: number; y: number };
    };
}

export function generateGradientV2(): GradientConfig {
    // Base hue
    const h1 = Math.floor(Math.random() * 360);
    // Analogous hues to create a cohesive but colorful blend
    const h2 = (h1 + 40 + Math.floor(Math.random() * 30)) % 360;
    const h3 = (h1 - 40 - Math.floor(Math.random() * 30) + 360) % 360;

    // Darker top, vibrant bottom — same logic as original
    const c1 = hslToHex(h1, 85, 25);       // Deep top color
    const c2 = hslToHex(h2, 95, 60);       // Bright bottom-right glow
    const c3 = hslToHex(h3, 80, 35);       // Medium top-right / side glow
    const baseLinear = hslToHex(h1, 75, 40); // Mid-tone for linear base

    return {
        // Mimics: linear-gradient(145deg, c1 0%, baseLinear 100%)
        base: {
            colors: [c1, baseLinear],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        },
        // Mimics: radial-gradient(circle at 100% 100%, c2 0%, transparent 90%)
        glowBottom: {
            colors: [c2, 'transparent'],
            start: { x: 1, y: 1 },
            end: { x: 0.1, y: 0.1 },
        },
        // Mimics: radial-gradient(circle at 80% 0%, c3 0%, transparent 80%)
        glowTop: {
            colors: [c3, 'transparent'],
            start: { x: 0.8, y: 0 },
            end: { x: 0.2, y: 1 },
        },
    };
}

export const getFileExtension = (url: string, fallback = 'pdf'): string => {
    try {
        const clean = url.split('?')[0]
        const parts = clean.split('.')
        return parts[parts.length - 1]?.toLowerCase() || fallback
    } catch {
        return fallback
    }
}
