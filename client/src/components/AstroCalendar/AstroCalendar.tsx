import React, { useState, useRef, useEffect, useCallback } from "react";
import "./AstroCalendar.css";
import events, {
    EVENT_COLORS,
    EVENT_LABELS,
    EVENT_EMOJI,
    type AstroEvent,
    type EventType,
} from "./astroEvents2026";

// ── Constants ─────────────────────────────────────────────────────────────
const TODAY = new Date(2026, 4, 5); // May 5, 2026
const YEAR = 2026;
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Helpers ────────────────────────────────────────────────────────────────
function dateKey(y: number, m: number, d: number) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// Some dates have split keys like "2026-07-10b" for same-day duplicates — merge
function getEventsForDate(y: number, m: number, d: number): AstroEvent[] {
    const key = dateKey(y, m, d);
    const base = events[key] ?? [];
    const extra = events[key + "b"] ?? [];
    return [...base, ...extra];
}

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDOW(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function isToday(y: number, m: number, d: number) {
    return y === TODAY.getFullYear() && m === TODAY.getMonth() && d === TODAY.getDate();
}

function getMonthSummary(month: number) {
    const types = new Set<EventType>();
    for (let d = 1; d <= getDaysInMonth(YEAR, month); d++) {
        getEventsForDate(YEAR, month, d).forEach((e) => types.add(e.type));
    }
    return Array.from(types);
}

// ── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipState { events: AstroEvent[]; x: number; y: number; }

function AstroTooltip({ tooltip }: { tooltip: TooltipState }) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: tooltip.x, y: tooltip.y });
    useEffect(() => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        let x = tooltip.x + 14, y = tooltip.y - 10;
        if (x + width > window.innerWidth - 12) x = tooltip.x - width - 14;
        if (y + height > window.innerHeight - 12) y = window.innerHeight - height - 10;
        if (y < 8) y = 8;
        setPos({ x, y });
    }, [tooltip.x, tooltip.y]);

    return (
        <div ref={ref} className="ac-tooltip" style={{ left: pos.x, top: pos.y }}>
            {tooltip.events.length === 1
                ? <div className="ac-tooltip-body"><EventTooltipContent evt={tooltip.events[0]} /></div>
                : tooltip.events.map((evt, i) => (
                    <div key={evt.id} className={`ac-tooltip-body${i < tooltip.events.length - 1 ? " ac-tooltip-divider" : ""}`}>
                        <EventTooltipContent evt={evt} />
                    </div>
                ))}
        </div>
    );
}

function EventTooltipContent({ evt }: { evt: AstroEvent }) {
    const color = EVENT_COLORS[evt.type];
    return (
        <>
            <div className="ac-tooltip-title-row">
                <span className="ac-tooltip-emoji">{EVENT_EMOJI[evt.type]}</span>
                <div>
                    <div className="ac-tooltip-name">{evt.name}</div>
                    <span className="ac-tooltip-badge" style={{ background: color + "22", color, border: `1px solid ${color}44` }}>
                        {EVENT_LABELS[evt.type]}
                    </span>
                </div>
            </div>
            <div className="ac-tooltip-rows">
                <div className="ac-tooltip-row ac-row-time">
                    <span>🕐</span><span>{evt.time}</span>
                </div>
                <div className="ac-tooltip-row">
                    <span>👁</span><span>{evt.visibility}</span>
                </div>
            </div>
            <div className="ac-tooltip-desc">{evt.description}</div>
        </>
    );
}

// ── Main component ────────────────────────────────────────────────────────
export default function AstroCalendar() {
    const [month, setMonth] = useState(TODAY.getMonth());
    const [tooltip, setTooltip] = useState<TooltipState | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const daysInMonth = getDaysInMonth(YEAR, month);
    const firstDOW = getFirstDOW(YEAR, month);
    const prevMonthDays = getDaysInMonth(YEAR, month - 1);
    const monthTypes = getMonthSummary(month);

    const show = useCallback((evts: AstroEvent[], e: React.MouseEvent) => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setTooltip({ events: evts, x: e.clientX, y: e.clientY });
    }, []);
    const hide = useCallback(() => { hideTimer.current = setTimeout(() => setTooltip(null), 120); }, []);

    useEffect(() => {
        const close = () => setTooltip(null);
        window.addEventListener("scroll", close, true);
        return () => window.removeEventListener("scroll", close, true);
    }, []);

    // Build 6×7 cell grid
    const cells: { day: number; month: number; inCurrent: boolean }[] = [];
    for (let i = firstDOW - 1; i >= 0; i--)
        cells.push({ day: prevMonthDays - i, month: month - 1, inCurrent: false });
    for (let d = 1; d <= daysInMonth; d++)
        cells.push({ day: d, month, inCurrent: true });
    let nd = 1;
    while (cells.length % 7 !== 0) cells.push({ day: nd++, month: month + 1, inCurrent: false });

    return (
        <div className="ac-root">
            <div className="ac-card">
                {/* Star field */}
                <div className="ac-starfield" aria-hidden="true" />

                {/* Top glow */}
                <div className="ac-glow-top" aria-hidden="true" />

                {/* Navigation */}
                <header className="ac-nav">
                    <button
                        className="ac-nav-btn"
                        onClick={() => setMonth(m => m - 1)}
                        disabled={month === 0}
                        aria-label="Previous month"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M11 4.5L6.5 9 11 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="ac-nav-center">
                        <div className="ac-month-name">{MONTHS[month]}</div>
                        <div className="ac-month-year">2026</div>
                    </div>

                    <button
                        className="ac-nav-btn"
                        onClick={() => setMonth(m => m + 1)}
                        disabled={month === 11}
                        aria-label="Next month"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M7 4.5l4.5 4.5L7 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </header>

                {/* Month event chips */}
                {monthTypes.length > 0 && (
                    <div className="ac-chips">
                        {monthTypes.map(type => (
                            <span key={type} className="ac-chip" style={{ borderColor: EVENT_COLORS[type] + "55", color: EVENT_COLORS[type] }}>
                                <span className="ac-chip-dot" style={{ background: EVENT_COLORS[type] }} />
                                {EVENT_EMOJI[type]} {EVENT_LABELS[type]}
                            </span>
                        ))}
                    </div>
                )}

                {/* DOW headers */}
                <div className="ac-dow-row">
                    {DOW.map(d => <div key={d} className="ac-dow">{d}</div>)}
                </div>

                {/* Grid */}
                <div className="ac-grid" role="grid">
                    {cells.map((cell, i) => {
                        const dayEvts = cell.inCurrent ? getEventsForDate(YEAR, cell.month, cell.day) : [];
                        const today = cell.inCurrent && isToday(YEAR, cell.month, cell.day);
                        const hasEvts = dayEvts.length > 0;
                        const hasEclipse = dayEvts.some(e => e.type === "eclipse");
                        const MAX = 4;
                        return (
                            <div
                                key={i}
                                role="gridcell"
                                className={[
                                    "ac-cell",
                                    !cell.inCurrent ? "ac-cell--other" : "",
                                    hasEvts ? "ac-cell--has-events" : "",
                                    today ? "ac-cell--today" : "",
                                    hasEclipse ? "ac-cell--eclipse" : "",
                                ].filter(Boolean).join(" ")}
                                onMouseEnter={hasEvts ? e => show(dayEvts, e) : undefined}
                                onMouseLeave={hasEvts ? hide : undefined}
                                onMouseMove={hasEvts ? e => { if (hideTimer.current) clearTimeout(hideTimer.current); setTooltip(p => p ? { ...p, x: e.clientX, y: e.clientY } : null); } : undefined}
                            >
                                {today && <div className="ac-today-ring" aria-hidden="true" />}

                                <span className="ac-day-num">
                                    {cell.inCurrent ? cell.day : ""}
                                </span>

                                {hasEvts && (
                                    <div className="ac-dots" aria-hidden="true">
                                        {dayEvts.slice(0, MAX).map(evt => (
                                            <span
                                                key={evt.id}
                                                className={`ac-dot ac-dot--${evt.type.replace("_", "-")}`}
                                                style={{ background: EVENT_COLORS[evt.type], boxShadow: `0 0 5px ${EVENT_COLORS[evt.type]}88` }}
                                            />
                                        ))}
                                        {dayEvts.length > MAX && <span className="ac-dot-more">+{dayEvts.length - MAX}</span>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <footer className="ac-legend">
                    {(Object.keys(EVENT_COLORS) as EventType[]).map(type => (
                        <div key={type} className="ac-legend-item">
                            <span className="ac-legend-emoji">{EVENT_EMOJI[type]}</span>
                            <span className="ac-legend-dot" style={{ background: EVENT_COLORS[type] }} />
                            <span>{EVENT_LABELS[type]}</span>
                        </div>
                    ))}
                </footer>
            </div>

            {tooltip && <AstroTooltip tooltip={tooltip} />}
        </div>
    );
}
